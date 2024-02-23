import {
  listAllEntries,
  findEntryById,
  addEntry,
  deleteEntryById,
  updateEntryById,
  listAllEntriesByUserId,
} from '../models/entry-model.mjs';
import {avgHoursSleptCalculator} from '../services/entry-services.mjs';

const getEntries = async (req, res) => {
  // return only logged in user's own entries
  // - get user's id from token (req.user.user_id)
  const result = await listAllEntriesByUserId(req.user.user_id);
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

// now only admins can check other users entries
const getEntryById = async (req, res) => {
  // Check if the user is authenticated (has a valid JWT token)
  if (!req.user) {
    return res.status(401).json({ error: 401, message: 'Unauthorized: User not authenticated' });
  }

  // Check if the authenticated user is an admin
  if (req.user.user_level !== 'admin') {
    return res.status(403).json({ error: 403, message: 'Forbidden: Insufficient permissions' });
  }

  // Proceed with retrieving the entry if the user is authenticated and is an admin
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postEntry = async (req, res) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = req.body;
  if (entry_date && (weight || mood || sleep_hours || notes) && user_id) {
    const result = await addEntry(req.body);
    if (result.entry_id) {
      res.status(201);
      res.json({message: 'New entry added.', ...result});
    } else {
      res.status(500);
      res.json(result);
    }
  } else {
    res.sendStatus(400);
  }
};

const putEntry = async (req, res) => {
  const entry_id = req.params.id;
  const {entry_date, mood, weight, sleep_hours, notes} = req.body;
  // check that all needed fields are included in request
  if ((entry_date || weight || mood || sleep_hours || notes) && entry_id) {
    const result = await updateEntryById({entry_id, ...req.body});
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};

const deleteEntry = async (req, res) => {
  const result = await deleteEntryById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

const getAvgHoursSleptByUserId = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from route parameter
    const loggedInUserId = req.user.user_id; // Get ID of the logged-in user

    // Check if the logged-in user matches the requested user ID
    if (parseInt(userId, 10) !== loggedInUserId) {
      return res.status(403).json({ error: 'Forbidden', message: 'You are not authorized to view this user\'s stats.' });
    }

    // Calculate and return the average hours slept by the logged-in user
    const averageHoursSlept = await avgHoursSleptCalculator(userId); // Pass userId instead of req
    res.json({ userId, averageHoursSlept });
  } catch (error) {
    console.error('Error fetching average hours slept:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry, getAvgHoursSleptByUserId};
