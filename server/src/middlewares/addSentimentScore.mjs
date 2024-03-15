import { analyzeTextAndGetScore } from '../services/NLP-services.mjs'

// Sentiment analysis middleware
const addSentimentScoreToEntry = async (req, res, next) => {
    try {
        // Extract entryText from the request body
        const entryData = req.body;
        const sentimentScore = await analyzeTextAndGetScore(entryData.entryText);

        // adding score to entryData
        entryData.sentimentScore = sentimentScore;
        console.log('SentimenScore added to entryDara: ', entryData)

        // Call next to pass control to the next middleware
        next();

    } catch (error) {
        // Handle the error
        console.error(error);
        res.status(500).send('Server error when adding sentimenScore to entryData');
    }
};


export { addSentimentScoreToEntry };
