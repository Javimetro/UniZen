// Import your calendar model
import { selectDay, selectMonth } from '../models/calendar-model.mjs';


async function getMonthData(req, res,next) {
    const userId = req.user.userId;  // Assuming you have user data in request from auth middleware
    const { year, month } = req.params; // e.g., 2023, 03

    try {
        const monthData = await selectMonth(userId, year, month);
        res.json(monthData);
    } catch (error) {
        console.error('Failed to fetch month data', error.message)
        next(error);
    }
}

async function getDayData(req, res, next) {
    const userId = req.user.userId;
    const { date } = req.params; // e.g., 2023-03-15

    try {
        const dayData = await selectDay(userId, date);
        res.json(dayData);
    } catch (error) {
        console.error('Failed to fetch day data:', error.message );
        next(error);
    }
}

export{ getDayData, getMonthData}
