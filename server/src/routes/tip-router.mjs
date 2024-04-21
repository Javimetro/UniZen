import express from 'express';
import {authenticateToken} from '../middlewares/authentication.mjs';
import { getTip } from '../controllers/tip-controller.mjs';

const tipRouter = express.Router();

tipRouter
  .get('/tip', authenticateToken, getTip)

export default tipRouter;
