import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator';


import {
  insertUser,
  selectUserById,
} from '../models/user-model.mjs';


const getUserById = async (req, res, next) => {
  const result = await selectUserById(req.params.id);
  if (result.error) {
    const error = new Error(result.message || 'An error occurred');
    error.status = result.error;
    return next(error);
  }
  return res.json(result);
};

const postUser = async (req, res, next) => {
  const { username, password, email } = req.body;
  const validationErrors = validationResult(req); //The validationResult(req) function is called to check for validation errors in the request. The result is stored in validationErrors.

  if (!validationErrors.isEmpty()) { //If there are validation errors (!validationErrors.isEmpty())
    const error = new Error('Bad request');//a new Error object is created with the message 'Bad request' and the status 400.
    error.status = 400;
    error.errors = validationErrors.array();//The validation errors are attached to the Error object as error.errors. This way errorHandler function can give more specific info about the error (in case it comes from validator)
    return next(error); //The Error object is then passed to the next function, which passes control to the next middleware function
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //function "insertUser"(user-models.mjs) inserts data to the db.
  await insertUser({ username, email, password: hashedPassword }, next);

  return res.status(201).json({ message: 'User created successfully' });
}; //sql errors are catched in the model (insertUser)



export { getUserById, postUser};
