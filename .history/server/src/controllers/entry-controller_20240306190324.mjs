import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {
  listAllEntries,
  findEntryById,
  addEntry,
  deleteEntryById,
  updateEntryById,
  listAllEntriesByUserId,
} from '../models/entry-model.mjs';
import {avgHoursSleptCalculator} from '../services/entry-services.mjs';

const getEntries = async (req, res, next) => {
  // return only logged in user's own entries
  // - get user's id from token (req.user.user_id)
  const result = await listAllEntriesByUserId(req.user.user_id);
  if (result.error) {
    const error = new Error(result.message || 'An error occurred');
    error.status = result.error;
    return next(error);
  }
  res.json(result);
};

// now only admins can check other users entries
const getEntryById = async (req, res, next) => {
  // Check if the user is authenticated (has a valid JWT token)
  if (!req.user) {
    const error = new Error('Unauthorized: User not authenticated');
    error.status = 401;
    return next(error);
  }

  // Check if the authenticated user is an admin
  if (req.user.user_level !== '1') {
    const error = new Error('Forbidden: Insufficient permissions');
    error.status = 403;
    return next(error);
  }

  // Proceed with retrieving the entry if the user is authenticated and is an admin
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    const error = new Error('Not Found: Entry does not exist');
    error.status = 404;
    return next(error);
  }
};

const postEntry = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Bad request');
    error.status = 400;
    error.errors = errors.array();
    return next(error);
  }

  // Extract the JWT from the Authorization header
  const token = req.headers.authorization.split(' ')[1];
  // Verify the JWT and extract the user's ID
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedToken);
  const user_id = decodedToken.user_id;

  // Extract the other properties from the request body
  const { entry_date, mood, weight, sleep_hours, notes } = req.body;

  if (entry_date && (weight || mood || sleep_hours || notes)) {
    try {
      const newEntry = { user_id, entry_date, mood, weight, sleep_hours, notes };
      // Include the user's ID when calling addEntry
      const result = await addEntry(newEntry);
      if (result.entry_id) {
        res.status(201);
        res.json({message: 'New entry added.', ...result});
      } else {
        const error = new Error('Server error');
        error.status = 500;
        return next(error);
      }
    } catch (error) {
      error.status = 500;
      return next(error);
    }
  } else {
    const error = new Error('Bad request');
    error.status = 400;
    return next(error);
  }
};

const putEntry = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Bad request');
    error.status = 400;
    error.errors = errors.array();
    return next(error);
  }

  const entry_id = req.params.id;
  const {entry_date, mood, weight, sleep_hours, notes} = req.body;

  if ((entry_date || weight || mood || sleep_hours || notes) && entry_id) {
    try {
      const result = await updateEntryById({entry_id, ...req.body});
      if (result.error) {
        const error = new Error(result.error);
        error.status = result.error;
        return next(error);
      }
      return res.status(201).json(result);
    } catch (error) {
      error.status = 500;
      return next(error);
    }
  } else {
    const error = new Error('Bad request at postEntry');
    error.status = 400;
    return next(error);
  }
};

const deleteEntry = async (req, res, next) => {
  const result = await deleteEntryById(req.params.id);
  if (result.error) {
    const error = new Error(result.message || 'An error occurred');
    error.status = result.error;
    return next(error);
  }
  return res.json(result);
};

const getAvgHoursSleptByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id; // Get user ID from route parameter
    const loggedInUserId = req.user.user_id; // Get ID of the logged-in user

    // Check if the logged-in user matches the requested user ID
    if (parseInt(userId, 10) !== loggedInUserId) {
      const error = new Error('You are not authorized to view this user\'s stats.');
      error.status = 403;
      return next(error);
    }

    // Calculate and return the average hours slept by the logged-in user
    const averageHoursSlept = await avgHoursSleptCalculator(userId); // Pass userId instead of req
    res.json({ userId, averageHoursSlept });
  } catch (error) {
    console.error('Error fetching average hours slept:', error);
    error.status = 500;
    next(error);
  }
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry, getAvgHoursSleptByUserId};
