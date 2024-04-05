import express from 'express';
import {getMe, postLogin} from '../controllers/kubios-auth-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

const authRouter = express.Router();

authRouter.post('/login', postLogin);
authRouter.get('/me', authenticateToken, getMe);

export default authRouter;
