import promisePool from '../utils/database.mjs';



async function updateCalendar(userId) {
    // SQL to get the latest readiness measurement for each day
    const getReadinessSQL = `
        SELECT readiness, DATE(timestamp) AS measuredDate
        FROM (
            SELECT readiness, timestamp,
                    ROW_NUMBER() OVER (PARTITION BY DATE(timestamp) ORDER BY timestamp DESC) as rn
            FROM measurements
            WHERE user_id = ?
        ) AS daily_measurements
        WHERE rn = 1;
    `;

    try {
        // Fetch the latest readiness measurement
        const [dailyReadinessData] = await promisePool.query(getReadinessSQL, [userId]);
        dailyReadinessData.forEach(async (data) => {
            const { readiness, measuredDate } = data;

            // Determine the color code based on readiness
            let colorCode;
            if (readiness < 33) {
                colorCode = '#ff0000'; // Red
            } else if (readiness >= 33 && readiness < 66) {
                colorCode = '#FFFF00'; // Yellow
            } else if (readiness >= 66) {
                colorCode = '#008000'; // Green
            }

            // SQL to insert or update the calendar table
            const updateCalendarSQL = `
                INSERT INTO calendar (user_id, date, avg_readiness, color_code)
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE avg_readiness = VALUES(avg_readiness), color_code = VALUES(color_code);
            `;

            // Update the calendar table with the fetched readiness and color code
            await promisePool.query(updateCalendarSQL, [userId, measuredDate, readiness, colorCode]);
        });
        console.log('Calendar updated successfully for all days for user:', userId);
    } catch (error) {
        console.error('Error updating calendar with daily readiness data:', error.message);
        throw error;
    }
}

async function getColorCodeByUserId(userId) {
    // SQL to get the latest color code for a specific user
    const getColorCodeSQL = `
        SELECT color_code
        FROM calendar
        WHERE user_id = ?
        ORDER BY date DESC
        LIMIT 1;
    `;

    try {
        // Fetch the latest color code
        const [rows] = await promisePool.query(getColorCodeSQL, [userId]);
        if (rows.length > 0) {
            return rows[0].color_code;
        } else {
            throw new Error(`No color code found for user with ID ${userId}`);
        }
    } catch (error) {
        console.error('Error getting color code:', error.message);
        throw error;
    }
}

// Function to get calendar data for a specific month
async function selectMonth(userId, year, month) {
    const sql = `
        SELECT * FROM calendar
        WHERE user_id = ? AND YEAR(date) = ? AND MONTH(date) = ?
        ORDER BY date ASC;
    `;
    const [rows] = await promisePool.query(sql, [userId, year, month]);
    return rows;
}

// Function to get data for a specific day
async function selectDay(userId, date) {
    const sql = `
        SELECT * FROM calendar
        WHERE user_id = ? AND date = ?
    `;
    const [rows] = await promisePool.query(sql, [userId, date]);
    return rows[0];
}


export { updateCalendar, getColorCodeByUserId, selectDay, selectMonth }
