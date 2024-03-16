// Main JS file
import express from 'express';
import session from 'express-session';
import path from 'path';
import {fileURLToPath} from 'url';
import tipRouter from './routes/tip-router.mjs';
import userRouter from './routes/user-router.mjs';
import entryRouter from './routes/entry-router.mjs';
import cors from 'cors';
import logger from './middlewares/logger.mjs';
import authRouter from './routes/auth-router.mjs';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();
import {errorHandler, notFoundHandler} from './middlewares/error-handler.mjs';

// middleware, joka lisää CORS-otsakkeen jokaiseen lähtevään vastaukseen.
// Eli kerrotaan selaimelle, että tämä palvelin sallii AJAX-pyynnöt
// myös muista kuin samasta alkuperästä (url-osoitteesta, palvelimelta) ladatuilta sivuilta.
app.use(cors());

app.use(session({
    secret: 'SESSION_SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: false
    }
}));


// logger middleware
app.use(logger);


// middleware, joka parsii pyynnössä olevan JSON-datan ja lisää sen request-objektiin (req.body)
app.use(express.json());

// Staattinen sivusto palvelimen juureen (public-kansion sisältö näkyy osoitteessa http://127.0.0.1:3000/sivu.html)
// Voit sijoittaa esim. valmiin client-sovelluksen tähän kansioon
app.use(express.static('public'));

// Staattinen sivusto voidaan tarjoilla myös "ali-url-osoitteessa": http://127.0.0.1:3000/sivusto
// Tarjoiltava kansio määritellään relatiivisella polulla (tässä käytössä sama kansio kuin yllä).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/sivusto', express.static(path.join(__dirname, '../public')));


// Test RESOURCE /tips endpoints (just mock data for testing, not connected to any database)
app.use('/api/tips', tipRouter);

// bind base url (/api/entries resource) for all entry routes to entryRouter
app.use('/api/entries', entryRouter);

// Users resource (/api/users)
app.use('/api/users', userRouter);

// User authentication
app.use('/api/auth', authRouter);

/*Route for testing "all errors" errorHandler function: (it worked)
make get request to "http://localhost:3000/error" for testing it. It should give error 500.
app.get('/error', (req, res, next) => {
  const error = new Error('Test Error');
  error.status = 0;
  next(error);
});
*/

// Default 404 not found
app.use(notFoundHandler);
// Error handler for sending response all error cases
app.use(errorHandler);


// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
