import promisePool from '../utils/database.mjs';


const selectUserByEmail = async (email) => {
  try {
    const sql = 'SELECT * FROM users WHERE email=?';
    const params = [email];
    const [rows] = await promisePool.query(sql, params);
    // console.log(rows);
    // if nothing is found with the user id, result array is empty []
    if (rows.length === 0) {
      return {error: 404, message: 'user not found'};
    }
    // Remove password property from result
    delete rows[0].password;
    return rows[0];
  } catch (error) {
    console.error('selectUserByEmail', error);
    return {error: 500, message: 'db error'};
  }
};



const selectUserById = async (id) => {
  try {
    const sql = 'SELECT * FROM users WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    // console.log(rows);
    // if nothing is found with the user id, result array is empty []
    if (rows.length === 0) {
      return {error: 404, message: 'user not found'};
    }
    // Remove password property from result
    delete rows[0].password;
    return rows[0];
  } catch (error) {
    console.error('selectUserById', error);
    return {error: 500, message: 'db error'};
  }
};

const insertUser = async (user) => {
  try {
    // Validate user input. if not name or ("||") password or mail then sends error 400
    if (!user.username || !user.email) {
      return { error: 400, message: 'Missing required fields' };
    }

    const sql =
      'INSERT INTO users (user_name, email, signup_date) VALUES (?, ?, NOW())';
    const params = [user.username, user.email];
    const [result] = await promisePool.query(sql, params);
    // console.log(result);
    return { message: 'new user created', user_id: result.insertId };
  } catch (error) {
    // now duplicate entry error is generic 500 error
    console.error('insertUser', error);
    return { error: 500, message: 'db error' };
  }
};


export {
  selectUserById,
  insertUser,
  selectUserByEmail
};
