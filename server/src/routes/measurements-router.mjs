import express from 'express';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {getUserData, getUserInfo} from '../controllers/measurements-controller.mjs';

const measurementsRouter = express.Router();

measurementsRouter
  .get('/user-data', authenticateToken, getUserData) // req example from 2024-01-01 to now: http://localhost:3000/api/measurements/user-data

  .get('/user-info', authenticateToken, getUserInfo);

export default measurementsRouter;
