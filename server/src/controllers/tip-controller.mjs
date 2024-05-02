import { getRandomTipByColorCode } from '../models/tip-model.mjs';
import { getColorCodeByUserId } from '../models/calendar-model.mjs';

const getTip = async (req, res, next) => {
    try {
        const userId = req.user.userId; // Gets user id from

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const colorCode = await getColorCodeByUserId(userId);

        if (!colorCode) {
            return res.status(404).json({ message: `No color code found for user with ID ${userId}` });
        }

        const tip = await getRandomTipByColorCode(colorCode);

        if (!tip) {
            return res.status(404).json({ message: 'No tip found for this color code' });
        }

        return res.json(tip);
    } catch (error) {
        console.error(`Error getting tip: ${error.message}`);
        next(error);
    }
}

export { getTip }
