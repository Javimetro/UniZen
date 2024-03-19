import express from 'express';
import { authenticateToken } from '../middlewares/authentication.mjs';
import { getTipByScore } from '../controllers/tip-controller.mjs';

/**
 * Express router for handling tip-related routes.
 *
 * @module tipRouter
 */
const tipRouter = express.Router();

// define routes here
// GET http://127.0.0.1:3000/api/tips
/**
 * @api {get} /api/tips Get tips by score
 * @apiName GetTipsByScore
 * @apiGroup Tips
 * @apiPermission authenticated
 * @apiDescription User might be logged in and one entry must be input before using endpoint. Entry data gets stored in express-session, server gets data using user's session and backend algorithm gives a sentiment score ("category" in the database) to the entry.Using this score/category, the app selects a tip according to it from the database and return it to user.
 *
 * @apiSuccess {number} tips.tip_id id of the tip.
 * @apiSuccess {String} tips.content Message of the tip.
 * @apiSuccess {Number} tips.category Score of the tip.
 *
 *

 * @apiSuccessExample Success response
 * {
    "tip_id": 41,
    "content": "Building on your positive mood can lead to new opportunities. Consider trying something new today that you’ve been curious about.",
    "category": 2
 *}
 *
 * @apiError (Unauthorized 401) Unauthorized User authentication failed.
 * @apiError (Not Found 404) NotFound Tip not found.
 * @apiErrorExample for example if user has not input an entry in actual session:
 * {
    "message": "Tip not found"
 *}
 */
tipRouter.get('/', authenticateToken, getTipByScore);

export default tipRouter;
