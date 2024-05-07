/**
 * @api {all} /not-found Not Found Handler
 * @apiName NotFoundHandler
 * @apiGroup Error
 * @apiDescription 404 handler
 *
 * @apiError {Object} 404 Some parameters may contain invalid values.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Sorry, {url} was not found :("
 *     }
 */
const notFoundHandler = (req, res, next) => {
    const error = new Error(`Sorry, ${req.originalUrl} was not found :(`);
    error.status = 404;
    next(error); // forward error to error handler
  };

/**
 * @api {all} /error-handler Error Handler
 * @apiName ErrorHandler
 * @apiGroup Error
 * @apiDescription Error handler for other errors that were not found by 404 status.
 *
 * @apiError {Object} 500 Some problems in the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": {
 *         "message": "{errorMessage}",
 *         "status": 500,
 *         "errors": "{errorDetails}"
 *       }
 *     }
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
