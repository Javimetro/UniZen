import express from 'express';
import {authenticateToken} from '../middlewares/authentication.mjs';
import { getMonthData, getDayData } from '../controllers/calendar-controller.mjs';

const calendarRouter = express.Router();

calendarRouter
// Route to get calendar data for a specific month
  .get('/month/:year/:month', authenticateToken, getMonthData)
// Route to get data for a specific day
  .get('/day/:date', authenticateToken, getDayData);


export default calendarRouter;
