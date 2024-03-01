import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator';
/*
Route Configuration: In your user-router.mjs file, you can use the authentication middleware (authenticateToken) by including it as a parameter before the route handler where authentication is required.
In the example provided by your teacher, the authenticateToken middleware is applied to the PUT request route for updating user information (/:id). This means that authentication is required before a user can update their information.
*/

import {
  deleteUserById,
  insertUser,
  listAllUsers,
  selectUserById,
  updateUserById,
} from '../models/user-model.mjs';

const getUsers = async (req, res) => {
  const result = await listAllUsers();
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

const getUserById = async (req, res) => {
  const result = await selectUserById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

const postUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check for validation errors. "validationResult(req)" hunts the validation errors that come from the middleware set in the route "app.post". if there is any it throws the 400 error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check that all needed fields are included in request
    if (username && password && email) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const result = await insertUser({
        username,
        email,
        password: hashedPassword,
      });
      if (result.error) {
        return res.status(result.error).json(result);
      }
      return res.status(201).json(result);
    } else {
      return res.status(400).json({ error: 400, message: 'bad request' });
    }
  } catch (error) {
    return res.status(500).json({ error: 500, message: 'internal server error' });
  }
};

// Only user authenticated by token can update own data
const putUser = async (req, res) => {
  // Get userinfo from req.user object extracted from token
  const user_id = req.user.user_id; //The user object on the req (request) object comes from authentication middleware.
  const {username, password, email} = req.body;
  // hash password if included in request
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // check that all needed fields are included in request
  if (user_id && username && password && email) {
    const result = await updateUserById({
      user_id,
      username,
      password: hashedPassword,
      email,
    });
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};

const deleteUser = async (req, res) => {
  const result = await deleteUserById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
