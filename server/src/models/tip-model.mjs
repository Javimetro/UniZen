import promisePool from '../utils/database.mjs';



async function getRandomTipByColorCode(color_code) {

    const colorMap = {
    '#ff0000': 'red',
    '#FFFF00': 'yellow',
    '#008000': 'green',
    };

    const color = colorMap[color_code];
    if (!color) {
        throw new Error(`Invalid color code: ${color_code}`);
    }

    const sql = `
        SELECT *
        FROM tips
        WHERE color = ?
        ORDER BY RAND()
        LIMIT 1
    `;

    try {
        const [rows] = await promisePool.query(sql, [color]);
        return rows[0];
    } catch (error) {
        console.error(`Error getting random tip by color: ${error.message}`);
        throw error;
    }
}

export {getRandomTipByColorCode}
