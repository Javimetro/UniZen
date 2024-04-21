async function getColorCodeByUserId(userId) {
  const sql = `
      SELECT color_code
      FROM calendar
      WHERE user_id = ?
      ORDER BY Date DESC
      LIMIT 1
  `;

  try {
      const [rows] = await promisePool.query(sql, [userId]);
      return rows[0]?.color_code;
  } catch (error) {
      console.error(`Error getting color code by user id: ${error.message}`);
      throw error;
  }
}

export { getColorCodeByUserId }
