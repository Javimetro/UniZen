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
import { addSentimentScoreToEntry } from '../middlewares/addSentimentScore.mjs'

const entryRouter = express.Router();

/**
 * Array of entry validations.
 *
 * @type {Array<ValidationChain>}
 */
const entryValidations = [
  body('entry_date').notEmpty().isDate(),
  body('text').optional().isLength({ max: 2000 }),
  body('energy_level').optional().isInt({ min: 0, max: 10 }),
  body('sleep_hours').optional().isInt({ min: 0, max: 24 }),
];

/**
 * @api {METHOD} /api/entry
 * @apiName Entry
 * @apiGroup Entry
 *
 * @apiDescription This endpoint is used for handling entry related operations.
 */
entryRouter.route('/')
  /**
   * @api {GET} /api/entry
   * @apiName GetEntries
   * @apiGroup Entry
   *
   * @apiDescription Get all entries.
   *
   * @apiPermission authenticated user
   */
  .get(authenticateToken, getEntries)
  /**
   * @api {POST} /api/entry
   * @apiName CreateEntry
   * @apiGroup Entry
   *
   * @apiDescription Create a new entry.
   *
   * @apiPermission authenticated user
   *
   * @apiParam {Date} entry_date The date of the entry.
   * @apiParam {string} [text] The text content of the entry (optional).
   * @apiParam {number} [energy_level] The energy level of the entry (optional).
   * @apiParam {number} [sleep_hours] The number of sleep hours in the entry (optional).
   */
  .post(authenticateToken, entryValidations, addSentimentScoreToEntry, postEntry);

entryRouter.route('/:id')
  /**
   * @api {GET} /api/entry/:id
   * @apiName GetEntryById
   * @apiGroup Entry
   *
   * @apiDescription Get a specific entry by ID.
   *
   * @apiPermission authenticated user
   *
   * @apiParam {string} id The ID of the entry.
   */
  .get(authenticateToken, getEntryById)
  /**
   * @api {PUT} /api/entry/:id
   * @apiName UpdateEntry
   * @apiGroup Entry
   *
   * @apiDescription Update a specific entry by ID.
   *
   * @apiPermission authenticated user
   *
   * @apiParam {string} id The ID of the entry.
   * @apiParam {Date} [entry_date] The updated date of the entry (optional).
   * @apiParam {string} [text] The updated text content of the entry (optional).
   * @apiParam {number} [energy_level] The updated energy level of the entry (optional).
   * @apiParam {number} [sleep_hours] The updated number of sleep hours in the entry (optional).
   */
  .put(entryValidations, putEntry)
  /**
   * @api {DELETE} /api/entry/:id
   * @apiName DeleteEntry
   * @apiGroup Entry
   *
   * @apiDescription Delete a specific entry by ID.
   *
   * @apiPermission authenticated user
   *
   * @apiParam {string} id The ID of the entry.
   */
  .delete(deleteEntry);

// entryRouter.route('/stats/:id').get(authenticateToken);

export default entryRouter;
