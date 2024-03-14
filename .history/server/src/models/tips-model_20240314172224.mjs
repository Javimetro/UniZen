import promisePool from '../utils/database.mjs';

const addTip = async (newTip) => {
  // Destructure the newEntry object to get the individual properties
  const {tip_id, entry_id, content} = newTip;
  //console.log(newEntry)

  // Construct a SQL query to insert a new entry into theentries table
  const sql = `INSERT INTO tips (tip_id, entry_id, content)
  VALUES (?, ?, ?)`;

  // Construct a parameters array to use with the SQL query
  const params = [tip_id, entry_id, content];

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

const listAllTipsByEntryId = async (id) => {
  try {
    const [rows] = await promisePool.query(
        'SELECT * FROM tips WHERE entry_id = ?',
        [id], //The array [id] contains the actual value that will replace the ? placeholder in the query.
    );
    // console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const updateTip = async (tip_id, updatedTipContent) => {
  // Construct a SQL query to update a tip in the `tips` table
  const sql = `UPDATE tips SET content = ? WHERE tip_id = ?`;
  try {
      // Execute the SQL query with the parameters
      const [rows] = await promisePool.query(sql, [updatedTipContent, tip_id]);
      // Check if any rows were affected
      if (rows.affectedRows === 0) {
          throw new Error(`Tip with ID ${tip_id} not found or content unchanged`);
      }
      // Return a success message or the updated tip object
      return { message: 'Tip updated successfully', tip_id };
  } catch (e) {
      // If an error occurs, log it and return an object with the error message
      console.error('Error updating tip:', e.message);
      return { error: e.message };
  }
};


const deleteTip = async (tip_id) => {
  // Construct a SQL query to delete a tip from the `tips` table
  const sql = `DELETE FROM tips WHERE tip_id = ?`;
  try {
    // Execute the SQL query with the tip_id as the parameter
    const [result] = await promisePool.query(sql, [tip_id]);
    // Check if any rows were affected (i.e., if the tip was actually deleted)
    if (result.affectedRows === 0) {
      throw new Error(`Tip with ID ${tip_id} not found or already deleted`);
    }
    // Return a success message
    return { message: 'Tip deleted successfully', tip_id };
  } catch (e) {
    // If an error occurs, log it and return an object with the error message
    console.error('Error deleting tip:', e.message);
    return { error: e.message };
  }
};


export {
  listAllTipsByEntryId,
  updateTip,
  addTip,
  deleteTip,
};
