/**
* Generic 404 handler
* @param {object} req - request object
* @param {object} res - response object
* @param {function} next - next function
*/
const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
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
