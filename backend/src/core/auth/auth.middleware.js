const { verifyToken } = require("./jwt");
const AppError = require("../helper/AppError");
const catchAsync = require("../helper/catchAsync");

const authMiddleware = catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized", 401);
    }
    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token); // Kalau error, langsung dilempar ke global error handler
    req.user = payload;
    next();
  });

module.exports = authMiddleware;