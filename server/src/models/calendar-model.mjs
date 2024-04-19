import promisePool from '../utils/database.mjs';

const listAllMeasurements = async () => {
  try {
    const [rows] = await promisePool.query('SELECT summary_id, user_id, Date, avg_readiness, color_code FROM calendar');
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const listAllMeasurementsByUserId = async (id) => {
  try {

    const sql = 'SELECT summary_id, user_id, Date, avg_readiness, color_code FROM calendar WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};


const findMeasurementById = async (id) => {
  try {
    const [rows] = await promisePool.query(
        'SELECT summary_id, user_id, Date, avg_readiness, color_code FROM calendar WHERE summary_id = ?',
        [id],
    );
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const insertMeasurement = async (newMeasurement) => {
  const {user_id, Date, avg_readiness, color_code} = newMeasurement;
  const sql = `INSERT INTO calendar (user_id, Date, avg_readiness, color_code)
  VALUES (?, ?, ?, ?)`;
  const params = [user_id, Date, avg_readiness, color_code];

  try {
    const rows = await promisePool.query(sql, params);
    return {summary_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const updateMeasurementById = async (measurement) => {
  const {summary_id, Date, avg_readiness, color_code} = measurement;
  try {
    const sql =
      'UPDATE calendar SET Date=?, avg_readiness=?, color_code=? WHERE summary_id=?';
    const params = [Date, avg_readiness, color_code, summary_id];
    const [result] = await promisePool.query(sql, params);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'measurement not found'};
    }
    return {message: 'measurement data updated', summary_id};
  } catch (error) {
    console.error('updateMeasurementById', error);
    return {error: 500, message: 'db error'};
  }
};

const deleteMeasurementById = async (id) => {
  try {
    const sql = 'DELETE FROM calendar WHERE summary_id=?';
    const params = [id];
    const [result] = await promisePool.query(sql, params);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'measurement not found'};
    }
    return {message: 'measurement deleted', summary_id: id};
  } catch (error) {
    console.error('deleteMeasurementById', error);
    return {error: 500, message: 'db error'};
  }
};

export {
  listAllMeasurements,
  listAllMeasurementsByUserId,
  findMeasurementById,
  insertMeasurement,
  updateMeasurementById,
  deleteMeasurementById,
};
