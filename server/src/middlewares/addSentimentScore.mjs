import { analyzeTextAndGetScore } from '../services/NLP-services.mjs'

// Sentiment analysis middleware
const addSentimentScoreToEntry = async (req, res, next) => {
    console.log('req.user in addSentimentScoreToEntry:', req.user);
    try {
        // Extract entryText from the request body
        const entryData = req.body;
        const sentimentScore = await analyzeTextAndGetScore(entryData.text);// .text selects the the property "text" of the entry

        // adding score to entryData
        entryData.sentimentScore = sentimentScore;
        console.log('SentimenScore added to entryDara: ', entryData)

        // Store sentimentScore in the session
        console.log('Sentiment Score before session:', sentimentScore);
        req.session.sentimentScore = sentimentScore;
        req.session.save(err => {
            if(err) {
                console.error(err);
                res.status(500).send('Server error when saving session');
            } else {
                console.log('Sentiment Score(added to session):', sentimentScore);
                next();
            }
        });

    } catch (error) {
        // Handle the error
        console.error(error);
        res.status(500).send('Server error when adding sentimenScore to entryData');
    }
};


export { addSentimentScoreToEntry };
