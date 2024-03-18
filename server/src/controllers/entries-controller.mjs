import {
    deleteEntryById,
    insertEntry,
    listAllEntries,
    listAllEntriesByUserId,
    updateEntryById,
  } from '../models/entry-model.mjs';


const getEntries = async (req, res) => {
  const result = await listAllEntries();
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

const getEntryById = async (req, res) => {
  const result = await listAllEntriesByUserId(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

const postEntry = async (req, res) => {
  console.log('req.user.user_id at start of postEntry:', req.user.user_id);

  const {entry_date, text, energy_level, sleep_hours, sentimentScore} = req.body;
  console.log('user_id before use:', req.user.user_id);

  // Extract user_id from req.user
  const newEntry = {
    user_id: req.user.user_id, // get user_id from req.user
    entry_date,
    text,
    energy_level,
    sleep_hours,
    sentimentScore: sentimentScore
  };

  // check that all needed fields are included in request
  if (newEntry.user_id && entry_date && text && energy_level && sleep_hours && sentimentScore !== null && sentimentScore !== undefined) { // // Check that sentimentScore is not null or undefined. This is necessary because 0 is a valid value for sentimentScore in my database, but is "falsy" in JavaScript.
    const result = await insertEntry(newEntry);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};

const putEntry = async (req, res) => {
  const entry_id = req.params.id;
  const {user_id, entry_date, text, energy_level,sleep_hours,sentimentScore} = req.body;
  // check that all needed fields are included in request
  if (user_id && entry_date && text && energy_level && sleep_hours && sentimentScore) {
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



export { getEntries, getEntryById, postEntry, putEntry, deleteEntry};
