import express from 'express';
import {authenticateToken} from '../middlewares/authentication.mjs';
import { getTip } from '../controllers/tip-controller.mjs';

/**
 * @apiDefine Authentication
 * @apiHeader {String} Authorization Bearer token for authentication.
 */

const tipRouter = express.Router();

/**
 * @api {get} /tip Get a tip
 * @apiName GetTip
 * @apiGroup Tips
 * @apiUse Authentication
 *
 * @apiSuccess {Object} tip Tip data from the database.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "tip_id": 4,
 *         "color": "Yellow",
 *         "tip_text": "You are doing okay, but there's room for improvement. Try some light exercise or mindfulness."
 *     }
 */
tipRouter.get('/tip', authenticateToken, getTip)

export default tipRouter;
