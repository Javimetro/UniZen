/**
 * Main JS file for the server.
 * @module index
 */

import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import tipRouter from './routes/tip-router.mjs';
import userRouter from './routes/user-router.mjs';
import entryRouter from './routes/entry-router.mjs';
import cors from 'cors';
import logger from './middlewares/logger.mjs';
import authRouter from './routes/auth-router.mjs';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

import { errorHandler, notFoundHandler } from './middlewares/error-handler.mjs';

/**
 * Middleware that adds CORS header to every outgoing response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => callback(null, true),
  })
);

/**
 * Middleware that handles session management.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
app.use(
  session({
    secret: 'SESSION_SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // set to true if site is served over HTTPS
      httpOnly: true,
      sameSite: 'lax', // The sameSite setting controls when cookie is sent. If it's set to 'lax', cookie is only sent when navigating within the same site. set to 'none' if your client is on a different domain.
    },
  })
);

/**
 * Middleware that logs session ID and sentiment score.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
app.use((req, res, next) => {
  console.log('Session ID MID:', req.sessionID);
  console.log('Sentiment Score MID:', req.session.sentimentScore);
  next();
});

/**
 * Middleware that logs request details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
app.use(logger);

/**
 * Middleware that parses JSON data in the request and adds it to the request object (req.body).
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
app.use(express.json());

/**
 * Serves static files from the root of the server (public folder contents are accessible at http://127.0.0.1:3000/sivu.html).
 */
app.use(express.static('public'));

/**
 * Serves static files from a subdirectory (http://127.0.0.1:3000/sivusto).
 * @param {string} '/sivusto' - The subdirectory path.
 * @param {Object} express.static - The express static middleware.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/sivusto', express.static(path.join(__dirname, '../public')));

/**
 * Test RESOURCE /tips endpoints (just mock data for testing, not connected to any database).
 * @param {string} '/api/tips' - The base URL for the tips resource.
 * @param {Object} tipRouter - The tip router middleware.
 */
app.use('/api/tips', tipRouter);

/**
 * Binds base URL (/api/entries resource) for all entry routes to entryRouter.
 * @param {string} '/api/entries' - The base URL for the entries resource.
 * @param {Object} entryRouter - The entry router middleware.
 */
app.use('/api/entries', entryRouter);

/**
 * Users resource (/api/users).
 * @param {string} '/api/users' - The base URL for the users resource.
 * @param {Object} userRouter - The user router middleware.
 */
app.use('/api/users', userRouter);

/**
 * User authentication.
 * @param {string} '/api/auth' - The base URL for the authentication resource.
 * @param {Object} authRouter - The authentication router middleware.
 */
app.use('/api/auth', authRouter);

/**
 * Default 404 not found.
 * @param {Object} notFoundHandler - The not found handler middleware.
 */
app.use(notFoundHandler);

/**
 * Error handler for sending response in all error cases.
 * @param {Object} errorHandler - The error handler middleware.
 */
app.use(errorHandler);

/**
 * Starts the server.
 * @param {number} port - The port number.
 * @param {string} hostname - The hostname.
 * @param {Function} callback - The callback function.
 */
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
