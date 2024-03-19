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

userRouter.get('/', authenticateToken, getUsers);

/**
 * @api {put} /api/users/:id Update user credentials
 * @apiGroup User
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {String} username User's new name. It must not be empty.
 * @apiParam {String} email User's new email. It must be a valid email address.
 * @apiParam {String} password User's new password. It must be at least 8 characters long.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "username": "newExampleUser",
 *    "email": "newExample@example.com",
 *    "password": "newExamplePassword"
 * }
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} user Updated user's data.
 * @apiSuccessExample {json} Success-Response:
 * {
    "message": "user data updated",
    "user_id": 4
 *}
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *    "message": "Invalid data"
 * }
 */
userRouter.put('/:id', authenticateToken, userValidationRules, putUser);

/**
 * @api {post} /api/users Register a new user
 * @apiName RegisterUser
 * @apiGroup User
 * @apiParam {String} username User's name. It must not be empty.
 * @apiParam {String} email User's email. It must be a valid email address.
 * @apiParam {String} password User's password. It must be at least 8 characters long.
 * @apiParamExample {json} Request-Example:
 *  {
    "username": "exampleUser",
    "password": "examplePassword",
    "email": "example@example.com"
*}
 * @apiSuccessExample {json} Success-Example response:
 * {
    "message": "User created successfully"
*}
 * @apiErrorExample Error-response if password is too short
 * {
    "error": {
        "message": "Bad request",
        "status": 400,
        "errors": [
            {
                "type": "field",
                "value": "e",
                "msg": "Password must be at least 8 characters long",
                "path": "password",
                "location": "body"
            }
        ]
    }
}
.

 */
userRouter.post('/', userValidationRules, postUser);


userRouter.get('/:id', authenticateToken, getUserById);


userRouter.delete('/:id', authenticateToken, deleteUser);

export default userRouter;
