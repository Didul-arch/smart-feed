const catchAsync = require('../helper/catchAsync');
const AppError = require('../helper/AppError');

const notFoundHandler = catchAsync((req, res) => {
  throw new AppError('Not Found', 404);
})

const sendErrorDev = (err, res) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const status = err instanceof AppError ? err.status : 'error';

  res.status(statusCode).json({
    status,
    message: err.message,
    stack: err.stack,
  });
  return;
};

const sendErrorProd = (err, res) => {
  const isOperationalError = err instanceof AppError ? err.isOperational : false;
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const status = err instanceof AppError ? err.status : 'error';

  if (isOperationalError) {
    res.status(statusCode).json({
      status: status,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
  return;
};

const globalErrorHandler = (
  err, req, res, next
) => {
  console.log('err', err.issues)
  if (err.name === 'ZodError') {
    if ('issues' in err && Array.isArray(err.issues) && err.issues[0]?.message) {
      err = new AppError(err.issues[0].path[0] + ' ' + err.issues[0].message, 400);
    }
  }
  if (err.name === 'PrismaClientKnownRequestError') {
    err = new AppError(err.meta.cause, 400);
  }
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
    return;
  }
  sendErrorProd(err, res);
  return;
};

module.exports = { notFoundHandler, globalErrorHandler };