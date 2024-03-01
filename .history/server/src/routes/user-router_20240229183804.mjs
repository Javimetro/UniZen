import express from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middlewares/authentication.mjs';

import {
  getUserById,
  getUsers,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.mjs';


// eslint-disable-next-line new-cap
const userRouter = express.Router();

// Validation rules for request body fields
const userValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Invalid email'),
  body('password')
    .trim() // used to remove white spaces that user could imput. whitespaces can bring errors
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

// /user endpoint
userRouter
  // eslint-disable-next-line indent
  .route('/')
  // list users
  .get(authenticateToken, getUsers)
  // update user (userValidationRules added as parametrer)
  .put(authenticateToken, userValidationRules, putUser)
  // user registration (userValidationRules added as parametrer)
  .post(userValidationRules, postUser);

// /user/:id endpoint
userRouter
  .route('/:id')
  // get info of a user
  .get(authenticateToken, getUserById)
  // delete user based on id
  .delete(authenticateToken, deleteUser);

export default userRouter;
