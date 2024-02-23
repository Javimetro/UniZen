import promisePool from '../utils/database.mjs';

const listAllDiaryEntries = async () => {
    try {
        const sql = 'SELECT entry_id, user_id, entry_date, mood, weight, sleep_hours, notes FROM diaryentries';
        const [rows] = await promisePool.query(sql);
        console.log(rows);
        return rows;
    } catch (error) {
        console.error('listAlldiaryentries', error);
        return {error: 500, message: 'db error'};
    }
};

const selectEntryById = async (id) => {
    try {
        const sql = 'SELECT * FROM diaryentries WHERE entry_id=?';
        const params = [id];
        const [rows] = await promisePool.query(sql, params);
        //console.log(rows);
        // if nothing is found with the entry id, result array is empty []
        if (rows.length === 0) {
            return {error: 404, message: 'entry not found'};
        }
        const entry = rows[0]
        return entry;
    } catch (error) {
        console.error('selectentryById', error);
        return {error: 500, message: 'database error'};
    }
};

const insertEntry = async (entry) => {
    try {
        const sql = 'INSERT INTO diaryentries (user_id, entry_date, mood, weight, sleep_hours, notes) VALUES (?, ?, ?, ?, ?, ?)';
        const params = [entry.user_id, entry.entry_date, entry.mood, entry.weight, entry.sleep_hours, entry.notes];
        const [result] = await promisePool.query(sql, params);
        return { message: 'new entry created', entry_id: result.insertId };
    } catch (error) {
        console.error('insertEntry error:', error);
        // Check for duplicate entry error (for example, MySQL duplicate entry error code is 1062)
        if (error.errno === 1062) {
                return { error: 400, message: 'duplicate entry' };
        }
        return { error: 500, message: 'db error' };
    }
};


const updateEntryById = async (entry) => {
    try {
        const sql = 'UPDATE diaryentries SET mood=?, weight=?, sleep_hours=?, notes=? WHERE entry_id=?';
        const params = [entry.mood, entry.weight, entry.sleep_hours, entry.notes, entry.entry_id];
        const [result] = await promisePool.query(sql, params);
        console.log(result);
        return {message: 'entry data updated', entry_id: entry.entry_id};
    } catch (error) {
        // fix error handling
        // now duplicate entry error is generic 500 error, should be fixed to 400 ?
        console.error('updateentryById', error);
        return {error: 500, message: 'db error'};
    }
};

const deleteEntryById = async (id) => {
    try {
        const sql = 'DELETE FROM diaryentries WHERE entry_id=?';
        const params = [id];
        const [result] = await promisePool.query(sql, params);
        console.log(result);
        if (result.affectedRows === 0) {
            return {error: 404, message: 'entry not found'};
        }
        return {message: 'entry deleted', entry_id: id};
    } catch (error) {
        // note that diaryentries with other data (FK constraint) cant be deleted directly
        console.error('deleteentryById', error);
        return {error: 500, message: 'db error'};
    }
};

export {listAllDiaryEntries, selectEntryById, insertEntry, updateEntryById, deleteEntryById};
