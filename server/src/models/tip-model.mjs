import promisePool from '../utils/database.mjs';

const getRandomTipByScore = async (score) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM tips WHERE category = ? ORDER BY RAND() LIMIT 1',
      [score]
    );
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export {
  getRandomTipByScore
};
