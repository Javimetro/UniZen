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
 *
 * @apiSuccess {number} tips.id id of the tip.
 * @apiSuccess {Number} tips.category Score of the tip.
 * @apiSuccess {String} tips.text Message of the tip.
 *
 * @apiError (Unauthorized 401) Unauthorized User authentication failed.
 */
tipRouter.get('/', authenticateToken, getTipByScore);

export default tipRouter;
