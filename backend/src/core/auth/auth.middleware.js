const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
// const AppError = require('../helper/appError');
const catchAsync = require('../helper/catchAsync');

const authMiddleware = catchAsync(async (req, res, next) => {
  // Check if Authorization header exists
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'fail',
      message: 'Please log in to get access'
    });
  }

  // Extract token
  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Add user to request object
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid or expired token'
    });
  }
});

module.exports = authMiddleware;