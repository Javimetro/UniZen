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

const postUser = async (req, res, next) => {
  const { username, password, email } = req.body;
  const validationErrors = validationResult(req); //The validationResult(req) function is called to check for validation errors in the request. The result is stored in validationErrors.

  if (!validationErrors.isEmpty()) { //If there are validation errors (!validationErrors.isEmpty())
    const error = new Error('Bad request');//a new Error object is created with the message 'Bad request' and the status 400.
    error.status = 400;
    error.errors = validationErrors.array();//The validation errors are attached to the Error object as error.errors.
    return next(error); //The Error object is then passed to the next function, which passes control to the next middleware function
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await insertUser({ username, email, password: hashedPassword }, next);

  return res.status(201).json({ message: 'User created successfully' });
}; //sql errors are catched in the model (insertUser)


// Only user authenticated by token can update own data
const putUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Bad request');
    error.status = 400;
    error.errors = errors.array();
    return next(error);
  }

  const user_id = req.user.user_id;
  const { username, password, email } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (user_id && username && password && email) {
    const result = await updateUserById({
      user_id,
      username,
      password: hashedPassword,
      email,
    });

    if (result.error) {
      const error = new Error(result.error);
      error.status = result.error;
      return next(error);
    }

    return res.status(201).json(result);
  } else {
    const error = new Error('Bad request');
    error.status = 400;
    return next(error);
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
