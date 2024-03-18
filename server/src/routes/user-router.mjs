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
  body('username').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Invalid email'),
  body('password')
    .trim() // used to remove white spaces that user could imput. whitespaces can bring errors
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

// /user endpoint
/**
 * @api {get} /user Get all users
 * @apiName GetUsers
 * @apiGroup User
 * @apiPermission authenticated
 *
 * @apiSuccess {Object[]} users List of users.
 * @apiSuccess {String} users.username User's username.
 * @apiSuccess {String} users.email User's email.
 *
 * @apiError (Unauthorized 401) Unauthorized User authentication failed.
 */
userRouter.get('/', authenticateToken, getUsers);

/**
 * @api {put} /user Update a user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission authenticated
 *
 * @apiParam {String} id User's ID.
 * @apiParam {String} username User's username.
 * @apiParam {String} email User's email.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiError (Unauthorized 401) Unauthorized User authentication failed.
 * @apiError (BadRequest 400) BadRequest Invalid request body.
 */
userRouter.put('/:id', authenticateToken, userValidationRules, putUser);

/**
 * @api {post} /user Register a new user
 * @apiName RegisterUser
 * @apiGroup User
 *
 * @apiParam {String} username User's username.
 * @apiParam {String} email User's email.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiError (BadRequest 400) BadRequest Invalid request body.
 */
userRouter.post('/', userValidationRules, postUser);

/**
 * @api {get} /user/:id Get a user by ID
 * @apiName GetUserById
 * @apiGroup User
 * @apiPermission authenticated
 *
 * @apiParam {String} id User's ID.
 *
 * @apiSuccess {String} username User's username.
 * @apiSuccess {String} email User's email.
 *
 * @apiError (Unauthorized 401) Unauthorized User authentication failed.
 * @apiError (NotFound 404) NotFound User not found.
 */
userRouter.get('/:id', authenticateToken, getUserById);

/**
 * @api {delete} /user/:id Delete a user by ID
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission authenticated
 *
 * @apiParam {String} id User's ID.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiError (Unauthorized 401) Unauthorized User authentication failed.
 * @apiError (NotFound 404) NotFound User not found.
 */
userRouter.delete('/:id', authenticateToken, deleteUser);

export default userRouter;
