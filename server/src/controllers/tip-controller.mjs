import { getSentimentScore } from '../services/nlp-service.mjs';
import { getRandomTipByScore } from '../models/tip-model.mjs';

const getTipByScore = async (req, res, next) => {
  const { text } = req.body; // Assuming you're passing the text in the request body

  try {
    const score = await getSentimentScore(text);
    const tip = await getRandomTipByScore(score);
    if (!tip) {
      return res.status(404).json({ message: 'Tip not found' });
    }
    res.status(200).json(tip);
  } catch (error) {
    console.error('Error getting tip:', error);
    const err = new Error('Error getting tip');
    err.status = 500;
    return next(err);
  }
};

export { getTipByScore };

