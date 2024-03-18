import express from 'express';
import {getMe, postLogin} from '../controllers/auth-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
/*
Route Configuration: In your user-router.mjs file, you can use the authentication middleware (authenticateToken) by including it as a parameter before the route handler where authentication is required.
In the example provided by your teacher, the authenticateToken middleware is applied to the PUT request route for updating user information (/:id). This means that authentication is required before a user can update their information.
*/

/**
 * Router for handling authentication related routes.
 *
 * @type {express.Router}
 */
const authRouter = express.Router();

// user login
authRouter.post('/login', postLogin)
  .get('/me', authenticateToken, getMe);

export default authRouter;
