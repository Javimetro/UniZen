import express from 'express';

/*
Route Configuration: In your user-router.mjs file, you can use the authentication middleware (authenticateToken) by including it as a parameter before the route handler where authentication is required.
In the example provided by your teacher, the authenticateToken middleware is applied to the PUT request route for updating user information (/:id). This means that authentication is required before a user can update their information.
*/

import {
  getUserById,
  getUsers,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

// eslint-disable-next-line new-cap
const userRouter = express.Router();

// /user endpoint
userRouter
  // eslint-disable-next-line indent
  .route('/')
  // list users
  .get(authenticateToken, getUsers)
  // update user
  .put(authenticateToken, putUser)
  // user registration
  .post(postUser);

// /user/:id endpoint
userRouter
  .route('/:id')
  // get info of a user
  .get(authenticateToken, getUserById)
  // delete user based on id
  .delete(authenticateToken, deleteUser);

export default userRouter;
