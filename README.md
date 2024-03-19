# Lepo, an AI-powered Health Diary

## Description

Lepo is a health calendar designed to assist students in managing their mental well-being. At its core, Lepo employs Natural Language Processing (NLP), a branch of artificial intelligence, to analyze daily journal entries. While the AI technology used is not as complex as some advanced models, it effectively discerns the sentiment of user inputs, providing a personalized experience.

Lepo's sentiment analysis only works with english language.

## Screenshots




## Client Setup

The client application uses Vite for development and build processes. Below are the scripts and dependencies required.

### Scripts

To run the client application, use the following npm scripts:

- **Development Server**: `npm run dev` - Starts the Vite development server.
- **Build**: `npm run build` - Compiles and bundles the client application for production deployment.
- **Preview**: `npm run preview` - Serves the production build locally for preview.

### Dependencies

- node-fetch: `^3.3.2`

### DevDependencies

- vite: `^5.1.0`

## Server Setup

The server side of the application requires several dependencies to run properly and some development dependencies for an efficient development workflow.

### Dependencies

These packages are necessary for the server application's runtime:

- **apidoc**: `^1.2.0` - For generating API documentation.
- **bcryptjs**: `^2.4.3` - For hashing and securing passwords.
- **cors**: `^2.8.5` - To enable CORS (Cross-Origin Resource Sharing).
- **dotenv**: `^16.4.1` - To load environment variables from a `.env` file.
- **express**: `^4.18.2` - The web application framework.
- **express-session**: `^1.18.0` - For managing user sessions.
- **express-validator**: `^7.0.1` - For validating and sanitizing input data.
- **jsonwebtoken**: `^9.0.2` - For generating and verifying JSON Web Tokens.
- **mysql2**: `^3.9.1` - MySQL client for Node.js.
- **natural**: `^6.12.0` - For natural language processing, including tokenization and stemming.

### DevDependencies

These packages are used during development and are not required in the production environment:

- **eslint**: `^8.56.0` - For ensuring code quality and consistency.
- **eslint-config-google**: `^0.14.0` - Google's ESLint configuration.
- **nodemon**: `^3.1.0` - Utility that automatically restarts the node application when file changes are detected.

### Installing Dependencies

After cloning the repository, navigate to the server directory and run the following command to install all the necessary dependencies:

```bash
npm install
```

## Database Schema
![Diagram](https://raw.githubusercontent.com/Javimetro/Lepo/new_database/documentation/database/Lepo-database-diagram.jpg)


## Project Features
Currently under development, Lepo aims to offer a safe and private space where students can express their feelings, reflect on their day, and track their emotional journey over time. Key features include:

- **Journaling**: Users can jot down their daily thoughts and feelings, with the NLP engine analyzing the sentiment of these entries.
- **Reviewing Past Entries**: The app allows users to revisit their previous journal entries, facilitating a reflective practice and personal growth.
- **Sentiment analysis & tips**: Based on the sentiment analysis of journal entries, Lepo offers tailored tips to help users manage stress and enhance their emotional well-being.
- **User Registration**: New users can easily sign up, creating a personal account that serves as a secure repository for their entries and interactions.
- **Secure Login**: With JWT-based authentication, Lepo ensures that access to an individual's account and data is guarded and confidential, maintaining user privacy at the forefront.
- **Profile Management**: Users have the flexibility to update their credentials and personalize their profiles, keeping their user experience relevant and up-to-date.

In addition to its core functionalities, Lepo uses an gauge indicator, powered by Google's chart package, to dynamically display the sentiment level of each journal entry. This feature is designed to offer users an immediate, visual understanding of their emotional state, with the gauge ranging from -5 to 5:

    - Negative Sentiments: Represented on the gauge from 0 to -5, negative sentiments are visually depicted to help users recognize and reflect on moments of distress or challenge.
    - Positive Sentiments: Spanning from 0 to 5, positive sentiments are clearly marked, celebrating moments of joy, accomplishment, and well-being.

The gauge indicator not only enriches the user interface but also empowers users to intuitively grasp the nuances of their emotional spectrum over time, fostering a deeper engagement with their personal mental health journey.

Disclaimer:

      Lepo's sentiment analysis is optimized for the English language and is designed to understand the emotional tone of your entries. Please be aware that the tips provided by Lepo are pre-stored in our database and selected for you based on the sentiment score of your entries. While Lepo aims to offer relevant and supportive tips, they might not always perfectly resonate with every individual's unique circumstances or needs. We encourage users to apply their discretion when following these tips and seek professional advice where necessary.

## Understanding Sentiment Analysis in Lepo

Lepo harnesses the power of the Natural library, coupled with the AFINN-111 lexicon, to conduct sentiment analysis on user journal entries. This process involves evaluating the emotional tone behind words, assigning each word a score that reflects its positive or negative sentiment.

How It Works:

    1. Tokenization: Each journal entry is broken down into individual words, or "tokens," using Natural's WordTokenizer. This step is crucial for analyzing the sentiment of each word independently.

```javascript
const tokenizer = new natural.WordTokenizer();
const tokens = tokenizer.tokenize(text);
```
    2. Stemming: text normalization technique used in natural language processing and information retrieval. It reduces words to their base or root form, effectively treating different forms of the same word as equivalent. For example, stemming would reduce the words "running," "runner," and "ran" to the base word "run."
```javascript
const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
```
    3. Analysis lexicon: AFINN is a sentiment analysis lexicon, which lists words and their associated sentiment scores. Developed by Finn Årup Nielsen, it's specifically designed for analyzing sentiment in short texts, such as tweets or reviews. Each word in the AFINN lexicon is rated on a scale from -5 to +5, with negative numbers indicating negative sentiment and positive numbers indicating positive sentiment. For example, the word "happy" might have a score of +3, indicating a positive sentiment, whereas "sad" might have a score of -2, indicating a negative sentiment.

    4. Score normalization: The algorithm accumulates only scores for sentiment-bearing words, ignoring neutral words (score of 0). The final sentiment score is normalized by averaging the total score over the number of sentiment-bearing words, ensuring a balanced measure regardless of entry length. The result is a rounded sentiment score, reflecting the overall emotional tone of the entry. Otherwise, a single word like "bastards" (-5 points) can have higher negative value than a long text with many negative words.
```javascript
tokens.forEach(token => {
    const score = analyzer.getSentiment([token]);
    if (score !== 0) {
        totalScore += score;
        sentimentWordCount++;
    }
});

const normalizedScore = sentimentWordCount > 0 ? totalScore / sentimentWordCount : 0;

return Math.round(normalizedScore);
```
5. Adding sentimentScore to the entry: Finally the sentiment score is added to the entry using express-session.

```javascript
entryData.sentimentScore = sentimentScore;
req.session.sentimentScore = sentimentScore;
req.session.save(err => {
    if(err) {
        console.error(err);
    } else {
        console.log('Sentiment score saved to session');
    }
});
```
### Live Application

Lepo is available online at: [Lepo Web App](lepo.northeurope.cloudapp.azure.com)

### Documentation and API Reference

For more detailed information about using Lepo and its API, visit the [Documentation](lepo.northeurope.cloudapp.azure.com/docs).

## Sources and references

The sources of information used in this project have been the educational material provided by my web development teachers Matti and Ulla.
[Matti's GitHub repository](https://github.com/mattpe/hyte-web-dev/tree/main)
[Ulla's GitHub repository](https://github.com/UllaSe/wsk-hyte-fe-material)
A constant partner in the development of this project has been chatGPT4. With the right inputs and a curious mindset, chatGPT is an extremely useful tool especially for a computer engineering student.
I have also briefly analyzed some [documents](http://corpustext.com/reference/sentiment_afinn.html) and [youtube videos](https://www.youtube.com/watch?v=uw3GbsY_Pbc) about Natural NLP and AFINN Sentiment Lexicon to understand how it works before implementing it in the code.

### Contact
If you want to report bugs or give me your feedback, feel free to contact me at jorganes@tutanota.com

## Future Development

The development of this project has taken a lot of work, but it needs even more. The algorithms for returning advice to the user are still at a primitive stage and I would like to improve them by incorporating data regarding the user's sleep habits and energy levels, which at the moment are simply stored in the database. Although I really enjoy designing user interfaces as I consider myself a creative person with artistic taste, the back-end part has consumed 90% of the time spent on the project. So I would like to develop a more intuitive and beautiful user interface in the future. A lot of the code I learned to write while doing this project, so there are redundant parts in many functions and could be eliminated. Cleaning up the junk code files is something I would like to do.


## Data Flow

User input text -> Using "Natural" NLP library the app gives a sentiment score to the user's entry -> Score is converted to a category in range (1-5) because that way tips are categoriced in the db -> Depending on the category of the text, a tip is randomly selected inside that category in the db -> Tip is finally returned to user.


