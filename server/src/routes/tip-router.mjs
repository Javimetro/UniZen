import express from 'express';
import { authenticateToken } from '../middlewares/authentication.mjs';
import { getTipByScore } from '../controllers/tip-controller.mjs';

const tipRouter = express.Router();

// define routes here
// GET http://127.0.0.1:3000/api/tips
tipRouter.get('/',authenticateToken, getTipByScore);

export default tipRouter;
