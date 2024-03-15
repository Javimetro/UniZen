import {
    deleteEntryById,
    insertEntry,
    listAllEntries,
    listAllEntriesByUserId,
    updateEntryById,
  } from '../models/entry-model.mjs';


const getEntries = async (res) => {
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
  const {user_id, entry_date, text, energy_level,sleep_hours,sentiment_score} = req.body;
  // check that all needed fields are included in request
  if (user_id && entry_date && text && energy_level && sleep_hours && sentiment_score) {
    const result = await insertEntry(req.body);
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
  const {user_id, entry_date, text, energy_level,sleep_hours,sentiment_score} = req.body;
  // check that all needed fields are included in request
  if (user_id && entry_date && text && energy_level && sleep_hours && sentiment_score) {
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
