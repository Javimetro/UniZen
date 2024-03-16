import promisePool from '../utils/database.mjs';

const getRandomTipBySentimentScore = async (sentimentScore) => {
  console.log(sentimentScore)
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM tips WHERE category = ? ORDER BY RAND() LIMIT 1',
      [sentimentScore]
    );
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export { getRandomTipBySentimentScore };
