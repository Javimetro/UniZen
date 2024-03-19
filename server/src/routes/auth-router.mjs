import express from 'express';
import {getMe, postLogin} from '../controllers/auth-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
/*
Route Configuration: In your user-router.mjs file, you can use the authentication middleware (authenticateToken) by including it as a parameter before the route handler where authentication is required.
In the example provided by your teacher, the authenticateToken middleware is applied to the PUT request route for updating user information (/:id). This means that authentication is required before a user can update their information.
*/
const authRouter = express.Router();
/**
 * @api {post} /api/auth/login Login
 * @apiGroup Authentication
 * @apiPermission all
 * @apiDescription Sign in and get an authentication token for the user.
 * @apiParam {String} username Username of the user.
 * @apiParam {String} password Password of the user.
 * @apiParamExample {json} Request-Example:
 * {
    "username": "testUser2",
    "password": "testPassword2"
 *}
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} user User info.
 * @apiSuccess {Number} user.user_id Id of the User.
 * @apiSuccess {String} user.username Username of the User.
 * @apiSuccess {String} user.email Email of the User.
 * @apiSuccess {String} user.created_at Timestamp of when the user was created.
 * @apiSuccess {Number} user.user_level User level of the User.
 * @apiSuccess {String} token Token for the user authentication.
 * @apiSuccessExample Success-Response:
 * {
    "message": "logged in successfully",
    "user": {
        "user_id": 4,
        "username": "testUser2",
        "email": "test2@mail.com",
        "created_at": "2024-03-14T14:12:38.000Z",
        "user_level": 2
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJ1c2VybmFtZSI6InRlc3RVc2VyMiIsImVtYWlsIjoidGVzdDJAbWFpbC5jb20iLCJjcmVhdGVkX2F0IjoiMjAyNC0wMy0xNFQxNDoxMjozOC4wMDBaIiwidXNlcl9sZXZlbCI6MiwiaWF0IjoxNzEwODMxODQwLCJleHAiOjE3MTA5MTgyNDB9._EUv92V8SNMmRRLBSEFQDtzVWT_vXqZTO3pOWvOrP7g"
 * }
 * @apiErrorExample Error-response:
 * {
            "error": {
                "message": "invalid username or password",
                "status": 401,
                "errors": ""
            }
        }
 * @apiName PostLogin
 */
// user login
authRouter.post('/login', postLogin);


/**
 * @api {get} /api/auth/me Request information about current user
 * @apiVersion 1.0.0
 * @apiName GetMe
 * @apiGroup Authentication
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object} user User info.
 * @apiSuccess {Number} user.user_id Id of the User.
 * @apiSuccess {String} user.username Username of the User.
 * @apiSuccess {String} user.email email of the User.
 * @apiSuccess {String} user.created_at Timestamp of when the user was created.
 * @apiSuccess {Number} user.user_level_id User level id of the User.
 * @apiSuccess {Number} user.iat Token creation timestamp.
 * @apiSuccess {Number} user.exp Expiration time of the token, represented as a Unix timestamp.
 * @apiSuccessExample Success-Response:
{
    "message": "token ok",
    "user": {
        "user_id": 4,
        "username": "testUser2",
        "email": "test2@mail.com",
        "created_at": "2024-03-14T14:12:38.000Z",
        "user_level": 2,
        "iat": 1710831840,
        "exp": 1710918240
    }
}
 *
 * @apiError InvalidToken Authentication token was invalid.
 *
 * @apiErrorExample Error-Response:
{
    "message": "invalid token"
}
 */
authRouter.get('/me', authenticateToken, getMe);

export default authRouter;
