import express from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middlewares/authentication.mjs';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
  getAvgHoursSleptByUserId,
} from '../controllers/entry-controller.mjs';


const entryRouter = express.Router();

const entryValidations = [
  body('entry_date').notEmpty().isDate(),
  body('mood').optional().isLength({ max: 2000 }),
  body('weight').optional().isFloat({ min: 1, max: 500 }),
  body('sleep_hours').optional().isInt({ min: 0, max: 24 }),
  body('notes').optional().isLength({ max: 300 }),
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
