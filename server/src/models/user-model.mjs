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



const listAllUsers = async () => {
  try {
    const sql = 'SELECT user_id, username, user_level FROM users';
    const [rows] = await promisePool.query(sql);
    console.log('Query result:', rows);
    return rows;
  } catch (error) {
    console.error('listAllUsers', error);
    return {error: 500, message: 'db error'};
  }

};
/* Test for checking database connection. It works!
const test = async () => {
  try{
    const sql = 'SELECT tip_text FROM tips';
    const [rows] = await promisePool.query(sql);
    console.log('Query result:', rows);
    return rows;
  } catch (error) {
    console.error('listAllUsers', error);
    return {error: 500, message: 'db error'};
  }
}

const runFunction = async () => {
  const result = await test();
  console.log(result);
};

runFunction();
*/

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
    if (!user.username || !user.password || !user.email) {
      return { error: 400, message: 'Missing required fields' };
    }

    const sql =
      'INSERT INTO users (username, password, email, user_level) VALUES (?, ?, ?, ?)';
    const params = [user.username, user.password, user.email, 2]; // Set user_level to 2 by default
    const [result] = await promisePool.query(sql, params);
    // console.log(result);
    return { message: 'new user created', user_id: result.insertId };
  } catch (error) {
    // now duplicate entry error is generic 500 error
    console.error('insertUser', error);
    return { error: 500, message: 'db error' };
  }
};

const updateUserById = async (user) => {
  try {
    const sql =
      'UPDATE users SET username=?, password=?, email=? WHERE user_id=?';
    const params = [user.username, user.password, user.email, user.user_id];
    await promisePool.query(sql, params);
    // console.log(result);
    return {message: 'user data updated', user_id: user.user_id};
  } catch (error) {
    // fix error handling
    // now duplicate entry error is generic 500 error, should be fixed to 400 ?
    console.error('updateUserById', error);
    return {error: 500, message: 'db error'};
  }
};

const deleteUserById = async (id) => {
  try {
    const sql = 'DELETE FROM users WHERE user_id=?';
    const params = [id];
    const [result] = await promisePool.query(sql, params);
    // console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'user not found'};
    }
    return {message: 'user deleted', user_id: id};
  } catch (error) {
    // note that users with other data (FK constraint) cant be deleted directly
    console.error('deleteUserById', error);
    return {error: 500, message: 'db error'};
  }
};

// used for login
const selectUserByUsername = async (username) => {
  try {
    const sql = 'SELECT * FROM users WHERE username=?';
    const params = [username];
    const [rows] = await promisePool.query(sql, params);
    // console.log(rows);
    // if nothing is found with the username, login attempt has failed
    if (rows.length === 0) {
      return {error: 401, message: 'invalid username or password'};
    }
    return rows[0];
  } catch (error) {
    console.error('selectUserByName', error);
    return {error: 500, message: 'db error'};
  }
};

export {
  listAllUsers,
  selectUserById,
  insertUser,
  updateUserById,
  deleteUserById,
  selectUserByUsername,
  selectUserByEmail
};
