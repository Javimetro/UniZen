import express from 'express';
import {getMe, postLogin} from '../controllers/kubios-auth-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

/**
 * Router for handling authentication-related routes.
 *
 * @module authRouter
 * @type {object}
 * @property {Function} get - Handles GET requests for getting acces to users information.
 * @property {Function} post - Handles POST requests for authentication with Kubios credentials.
 */
const authRouter = express.Router();
/**
 * @api {post} /login Authenticate a user
 * @apiName PostLogin
 * @apiGroup Authentication
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "seppo@metropolia.fi",
 *       "password": "seppopasswordforkubios"
 *     }
 *
 * @apiSuccess {String} token Access token for the authenticated user.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Logged in successfully with Kubios",
 *       "user": {
 *         "birthdate": "1990-10-09",
 *         "email": "seppo@metropolia.fi",
 *         "family_name": "Seppoliini",
 *         "gender": "male",
 *         "given_name": "Seppo",
 *         "height": 1.53,
 *         "sub": "3801e8bd-909c-40a5-8f3b-fe082fca8e31",
 *         "weight": 65
 *       },
 *       "user_id": 1,
 *       "token": "..."
 *     }
 */
authRouter.post('/login', postLogin);


/**
 * @api {get} /me Get current user's information
 * @apiName GetMe
 * @apiGroup Authentication
 *
 * @apiHeader {String} Authorization Bearer token for authentication.
 *
 * @apiSuccess {Object} user User's information.
 */
authRouter.get('/me', authenticateToken, getMe);

export default authRouter;
