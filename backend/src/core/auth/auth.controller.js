const bcrypt = require('bcryptjs');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('./jwt')
const AppError = require('../helper/appError');
const prisma = require('../../db');
const catchAsync = require('../helper/catchAsync')

class authController {
  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          status: 'fail',
          message: 'Please provide email and password'
        });
      }

      // Find user and check password
      const user = await prisma.user.findUnique({
        where: { email }
      });
      if (!user) throw new AppError('user not found!', 404);

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new AppError('Password salah', 401);

      // Generate tokens
      const accessToken = generateToken({ id: user.id, email: user.email });
      const refreshToken = generateRefreshToken({ id: user.id });

      // Return response
      res.status(200).json({
        status: 'success',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name
          },
          accessToken,
          refreshToken
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message || 'Internal server error'
      });
    }
  };

  refresh = catchAsync(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        status: 'fail',
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken);

    // Generate new access token
    const newToken = generateToken({
      id: payload.id
    });

    return res.status(200).json({
      status: 'success',
      data: {
        accessToken: newToken
      }
    });
  });
}


module.exports = new authController();