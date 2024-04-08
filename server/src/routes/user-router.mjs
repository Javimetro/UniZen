import express from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middlewares/authentication.mjs';

import {
  getUserById,
  postUser
} from '../controllers/user-controller.mjs';


// eslint-disable-next-line new-cap
const userRouter = express.Router();

// Validation rules for request body fields
const userValidationRules = [
  body('username').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Invalid email'),
  body('password')
    .trim() // used to remove white spaces that user could imput. whitespaces can bring errors
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

userRouter.post('/', userValidationRules, postUser);


userRouter.get('/:id', authenticateToken, getUserById);

export default userRouter;
