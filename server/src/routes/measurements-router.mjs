import express from 'express';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {getUserData, getUserInfo} from '../controllers/measurements-controller.mjs';

const measurementsRouter = express.Router();

measurementsRouter
  .get('/user-data', authenticateToken, getUserData)
  .get('/user-info', authenticateToken, getUserInfo);

export default measurementsRouter;
