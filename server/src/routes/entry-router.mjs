import express from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middlewares/authentication.mjs';
import {
  getEntries,
  postEntry,
  getEntryById,
  putEntry,
  deleteEntry,
} from '../controllers/entries-controller.mjs';

const entryRouter = express.Router();

const entryValidations = [
  body('entry_date').notEmpty().isDate(),
  body('text').optional().isLength({ max: 2000 }),
  body('energy_level').optional().isInt({ min: 0, max: 10 }),
  body('sleep_hours').optional().isInt({ min: 0, max: 24 }),
];

entryRouter.route('/')

/**
 * @api {GET} /api/entries  get all entries
 *
 * @apiGroup Entries
 *
 * @apiDescription Get all user's entries.
 * @apiHeader {String} Authorization Bearer token.
 * @apiPermission authenticated user
 * @apiSuccessExample Success-Response:
 * [
 *   {
 *     "entry_id": 1,
 *     "user_id": 1,
 *     "entry_date": "2024-03-14T22:00:00.000Z",
 *     "text": "Had a great day today, everything went well!",
 *     "energy_level": null,
 *     "sleep_hours": null,
 *     "sentiment_score": 0.8,
 *     "created_at": "2024-03-13T17:03:05.000Z"
 *   },
 *   {
 *     "entry_id": 2,
 *     "user_id": 2,
 *     "entry_date": "2024-03-14T22:00:00.000Z",
 *     "text": "Feeling stressed about the upcoming exams.",
 *     "energy_level": null,
 *     "sleep_hours": null,
 *     "sentiment_score": -0.5,
 *     "created_at": "2024-03-13T17:03:05.000Z"
 *   }
 * ]
 *
 * @apiSuccess {Number} entry_id Id of the entry.
 * @apiSuccess {Number} user_id Id of the user who made the entry.
 * @apiSuccess {String} entry_date Date and time of the entry.
 * @apiSuccess {String} text Text content of the entry.
 * @apiSuccess {Number} energy_level Energy level of the user when the entry was made (can be null).
 * @apiSuccess {Number} sleep_hours Number of hours the user slept before making the entry (can be null).
 * @apiSuccess {Number} sentiment_score Sentiment score of the entry text.
 * @apiSuccess {String} created_at Timestamp of when the entry was created.
 * @apiName GetEntries
 */
.get(authenticateToken, getEntries);
entryRouter.route('/')
/**
 * @api {post} /api/entries Post an entry
 * @apiGroup Entries
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {String} [text] Text content of the entry. Optional, but if provided, must be no more than 2000 characters.
 * @apiParam {Number} [energy_level] Energy level of the user when the entry was made. Optional, but if provided, must be an integer between 0 and 10.
 * @apiParam {Number} [sleep_hours] Number of hours the user slept before making the entry. Optional, but if provided, must be an integer between 0 and 24.
 * @apiParamExample {json} Request-Example:
 *  {
    "entry_date" : "2024-03-13 19:03:05",
    "text": "Feeling great today!",
    "energy_level": 8,
    "sleep_hours": 7
 *}
 * @apiSuccessExample {json} Success-Example response:
 * {
    "entry_id": 75
 *}
 * @apiErrorExample Error-response
 * {
    "error": 400,
    "message": "bad request"
 *}
 *
 * @apiName PostEntry
 */
 .post(authenticateToken, entryValidations, postEntry);

entryRouter.route('/:id')
.get(authenticateToken, getEntryById)
.put(entryValidations, putEntry)
.delete(deleteEntry);

// entryRouter.route('/stats/:id').get(authenticateToken);

export default entryRouter;
