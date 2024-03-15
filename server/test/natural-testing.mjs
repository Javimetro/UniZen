import natural from 'natural';

const text1 = 'This is horrible. Never felt this bad.';
const text2 = 'Feeling stressed about the upcoming exams. This is horrible. Never felt this bad. Not feeling well, stayed in bed most of the day.';
const text3 = 'Not feeling well, stayed in bed most of the day.';
const text4 = 'sad';
const text5 = 'Feeling super good today, this is the best day of my life.';

// This function analyzes the sentiment score of a given text
const analyzeTextAndGetScore = (text) => {
    // Create a tokenizer to split the text into individual words
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(text); // Tokenize the text

    // Create a sentiment analyzer using the 'afinn' sentiment lexicon
    const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

    let totalScore = 0; // Variable to store the sum of sentiment scores
    let sentimentWordCount = 0; // Variable to count the number of sentiment-bearing words

    // Iterate through each token (word) in the text
    tokens.forEach(token => {
        const score = analyzer.getSentiment([token]); // Analyze each token
        if (score !== 0) {
            totalScore += score; // Sum up scores of sentiment-bearing words
            sentimentWordCount++; // Count the number of sentiment-bearing words
        }
    });

    // Normalize the score by dividing the total score by the number of sentiment-bearing words -> average score per sentiment-bearing word
    const normalizedScore = sentimentWordCount > 0 ? totalScore / sentimentWordCount : 0;

    return normalizedScore;
};

console.log("The sentiment score is: " + analyzeTextAndGetScore(text1));
