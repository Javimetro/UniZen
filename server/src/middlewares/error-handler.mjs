/**
* Generic 404 handler
* @param {object} req - request object
* @param {object} res - response object
* @param {function} next - next function
*/
const notFoundHandler = (req, res, next) => {
    const error = new Error(`Sorry, ${req.originalUrl} was not found :(`);
    error.status = 404;
    next(error); // forward error to error handler
  };

/**
 * Custom default middleware for handling errors
 * @param {object} err - error object
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const errorHandler = (err, req, res, next) => {
res.status(err.status || 500); // default is 500 if err.status is not defined
res.json({
    error: {
        message: err.message,
        status: err.status || 500,
        errors: err.errors || '',
    },
});
};

export {notFoundHandler, errorHandler};

/* the main point of using error handling middleware is to centralize error handling logic in one place, making your code cleaner and easier to maintain.
Without middleware, you would have to handle errors individually in each route, which can lead to repetitive code and inconsistencies. */
