// Main JS file
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import measurementsRouter from './routes/measurements-router.mjs';
import tipRouter from './routes/tip-router.mjs';
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
app.use(cors({
  credentials: true,
  origin: (origin, callback) => callback(null, true),
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
// Kubios API resource (/api/kubios)
app.use('/api/measurements', measurementsRouter);
// User authentication
app.use('/api/auth', authRouter);
// User tip
app.use('/api', tipRouter);
// Default 404 not found
app.use(notFoundHandler);
// Error handler for sending response all error cases
app.use(errorHandler);
// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
