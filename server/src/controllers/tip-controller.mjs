import {getRandomTipBySentimentScore} from '../models/tip-model.mjs';

const getTipByScore = async (req, res, next) => {
  try {
    console.log('Before accessing req.session:', req.session); // Log the entire session before accessing sentimentScore
    const sentimentScore = req.session.sentimentScore;
    console.log(req.session)
    console.log('Sentiment Score:', sentimentScore); // Log the sentimentScore after accessing it
    const tip = await getRandomTipBySentimentScore(sentimentScore);
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

