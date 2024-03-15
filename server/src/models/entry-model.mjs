// Note: db functions are async and must be
// called with await from the controller
import promisePool from '../utils/database.mjs';


const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM entries');
    // console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const listAllEntriesByUserId = async (id) => {
  try {
    const sql = 'SELECT * FROM entries WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    // console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findEntryById = async (id) => {
  try {
    const [rows] = await promisePool.query(
        'SELECT * FROM entries WHERE entry_id = ?',
        [id],
    );
    // console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const insertEntry = async (newEntry) => {
  // Destructure the newEntry object to get the individual properties
  const {user_id, entry_date, text, energy_level, sleep_hours, sentiment_score} = newEntry;
  //console.log(newEntry)

  // Construct a SQL query to insert a new entry into theentries table
  const sql = `INSERT INTO entries (user_id, entry_date, text, energy_level, sleep_hours, sentimen_score)
  VALUES (?, ?, ?, ?, ?, ?)`;

  // Construct a parameters array to use with the SQL query
  const params = [user_id, entry_date, text, energy_level, sleep_hours, sentiment_score];

  try {
    // Execute the SQL query with the parameters
    const rows = await promisePool.query(sql, params);

    // Return an object with the ID of the inserted entry
    return {entry_id: rows[0].insertId};
  } catch (e) {
    // If an error occurs, log it and return an object with the error message
    console.error('error', e.message);
    return {error: e.message};
  }
};

const updateEntryById = async (entry) => {
  const {entry_id, entry_date, text, energy_level, sleep_hours, sentiment_score} = entry;
  try {
    const sql =
      'UPDATE entries SET entry_date=?, text=?, energy_level=?, sleep_hours=?, sentiment_score=? WHERE entry_id=?';
    const params = [entry_date, text, energy_level, sleep_hours, sentiment_score, entry_id];
    const [result] = await promisePool.query(sql, params);
    // console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'entry not found'};
    }
    return {message: 'entry data updated', entry_id};
  } catch (error) {
    // fix error handling
    // now duplicate entry error is generic 500 error, should be fixed to 400 ?
    console.error('updateEntryById', error);
    return {error: 500, message: 'db error'};
  }
};

const deleteEntryById = async (id) => {
  try {
    const sql = 'DELETE FROM entries WHERE entry_id=?';
    const params = [id];
    const [result] = await promisePool.query(sql, params);
    // console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'entry not found'};
    }
    return {message: 'entry deleted', entry_id: id};
  } catch (error) {
    console.error('deleteEntryById', error);
    return {error: 500, message: 'db error'};
  }
};

export {
  listAllEntries,
  listAllEntriesByUserId,
  findEntryById,
  insertEntry,
  updateEntryById,
  deleteEntryById,
};
