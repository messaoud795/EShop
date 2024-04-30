const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'DEVELOPMENT')
    res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  if (process.env.NODE_ENV === 'PRODUCTION') {
    error = { ...err };
    error.message = err.message;
    //wrong mongoose Object ID
    if (err.name === 'CastName') {
      const message = `Resource not Found. Invalid : ${err.path}`;
      error = new ErrorHandler(message, 404);
    }
    //handling mongoose validation errors
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(value => value.message);
      error = new ErrorHandler(message, 400);
    }

    //handling mongoose duplicate keys errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.values(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    //handling wrong JWT errors
    if (err.code === 'JsonWebTokenError') {
      const message = 'Json Web Token Invalid, please try again';
      error = new ErrorHandler(message, 400);
    }
    if (err.code === 'TokenExpiredError') {
      const message = 'Json Web Token expired';
      error = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  }
};
