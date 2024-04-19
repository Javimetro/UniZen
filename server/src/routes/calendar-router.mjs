import express from 'express';
import {getMeasurementById} from '../controllers/calendar-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

const calendarRouter = express.Router();

calendarRouter.get('/getall', authenticateToken, getMeasurementById);

export default calendarRouter;
