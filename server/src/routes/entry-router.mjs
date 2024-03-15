import express from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middlewares/authentication.mjs';
import {
  getEntries,
  postEntry,
  getEntryById,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';
import { addSentimentScoreToEntry } from '../middlewares/addSentimentScore.mjs'

const entryRouter = express.Router();

const entryValidations = [
  body('entry_date').notEmpty().isDate(),
  body('text').optional().isLength({ max: 2000 }),
  body('energy_level').optional().isInt({ min: 0, max: 10 }),
  body('sleep_hours').optional().isInt({ min: 0, max: 24 }),
];

entryRouter.route('/')
  .get(authenticateToken, getEntries)
  .post(entryValidations, addSentimentScoreToEntry, postEntry);

entryRouter.route('/:id')
  .get(authenticateToken, getEntryById)
  .put(entryValidations, putEntry)
  .delete(deleteEntry);

entryRouter.route('/stats/:id').get(authenticateToken, getAvgHoursSleptByUserId);

export default entryRouter;
