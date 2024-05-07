import express from 'express';
import {authenticateToken} from '../middlewares/authentication.mjs';
import { getMonthData, getDayData } from '../controllers/calendar-controller.mjs';

/**
 * Express router for handling calendar routes.
 *
 * @type {express.Router}
 * @name calendarRouter
 * @memberof module:routes/calendar-router
 */
const calendarRouter = express.Router();

/**
 * @api {get} /month/:year/:month Request calendar data for a specific month
 * @apiName GetMonthData
 * @apiGroup Calendar
 *
 * @apiHeader {String} Authorization Bearer token for authentication.
 *
 * @apiParam {Number} year Year of the month.
 * @apiParam {Number} month Month number (1-12).
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "summary_id": 1322,
 *        "user_id": 1,
 *        "date": "2024-04-08T21:00:00.000Z",
 *        "avg_readiness": "54.60",
 *        "color_code": "#FFFF00"
 *      },
 *      {
 *        "summary_id": 1262,
 *        "user_id": 1,
 *        "date": "2024-04-08T21:00:00.000Z",
 *        "avg_readiness": "54.60",
 *        "color_code": "#FFFF00"
 *      }
 *    ]
 *
 * @apiSuccess {Object[]} monthData Data for the requested month.
 */
calendarRouter.get('/month/:year/:month', authenticateToken, getMonthData)

/**
 * @api {get} /day/:date Request data for a specific day
 * @apiName GetDayData
 * @apiGroup Calendar
 *
 * @apiHeader {String} Authorization Bearer token for authentication.
 *
 * @apiParam {String} date Date in YYYY-MM-DD format.
 *
 * @apiSuccess {Object} dayData Data for the requested day.
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "summary_id": 1230,
 *      "user_id": 1,
 *      "date": "2024-04-08T21:00:00.000Z",
 *      "avg_readiness": "54.60",
 *      "color_code": "#FFFF00"
 *    }
 */
calendarRouter.get('/day/:date', authenticateToken, getDayData);

export default calendarRouter;
