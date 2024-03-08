// Note: db functions are async and must be
// called with await from the controller
import promisePool from '../utils/database.mjs';


const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
    // console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const listAllEntriesByUserId = async (id) => {
  try {
    const sql = 'SELECT * FROM DiaryEntries WHERE user_id=?';
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
        'SELECT * FROM DiaryEntries WHERE entry_id = ?',
        [id],
    );
    // console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addEntry = async (newEntry) => {
  // Destructure the newEntry object to get the individual properties
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = newEntry;
  console.log(newEntry)

  // Construct a SQL query to insert a new entry into the DiaryEntries table
  const sql = `INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes)
  VALUES (?, ?, ?, ?, ?, ?)`;

  // Construct a parameters array to use with the SQL query
  const params = [user_id, entry_date, mood, weight, sleep_hours, notes];

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
  const {entry_id, entry_date, mood, weight, sleep_hours, notes} = entry;
  try {
    const sql =
      'UPDATE DiaryEntries SET entry_date=?, mood=?, weight=?, sleep_hours=?, notes=? WHERE entry_id=?';
    const params = [entry_date, mood, weight, sleep_hours, notes, entry_id];
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
    const sql = 'DELETE FROM DiaryEntries WHERE entry_id=?';
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
  addEntry,
  updateEntryById,
  deleteEntryById,
};
