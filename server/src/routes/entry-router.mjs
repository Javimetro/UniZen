import express from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middlewares/authentication.mjs';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';

const entryRouter = express.Router();

const entryValidations = [
  body('entry_date').notEmpty().isDate(),
  body('text').optional().isLength({ max: 2000 }),
  body('energy_level').optional().isInt({ min: 0, max: 10 }), // Assuming energy_level is an integer between 0 and 10
  body('sleep_hours').optional().isInt({ min: 0, max: 24 }),
  body('sentiment_score').optional().isFloat({ min: -1.0, max: 1.0 }), // Assuming sentiment_score is a float between -1.0 and 1.0
];

entryRouter.route('/')
  .get(authenticateToken, getEntries)
  .post(entryValidations, postEntry);

entryRouter.route('/:id')
  .get(authenticateToken, getEntryById)
  .put(entryValidations, putEntry)
  .delete(deleteEntry);

entryRouter.route('/stats/:id').get(authenticateToken, getAvgHoursSleptByUserId);

export default entryRouter;
