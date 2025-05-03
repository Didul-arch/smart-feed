const bcrypt = require('bcryptjs');
const { generateToken, generateRefreshToken } = require('./jwt')
const AppError = require('../helper/AppError');
const prisma = require('../../db');

class authController {
  login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {email}
    });
    if(!user) throw new AppError('user not found!', 404);
  
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) throw new AppError('Password salah', 401);
  
    const payload = { id: user.id };
    const token = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);
    
    res.json({ 
      token, 
      refreshToken 
    });
  });


refresh = async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    throw new AppError('Refresh token is required', 400);
  }
  
  try {
    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken);
    
    // Generate new access token
    const newToken = generateToken({
      id: payload.id
    });
    
    res.json({
      token: newToken
    });
    
  } catch (error) {
    throw new AppError('Invalid refresh token', 401);
  }
}
}


module.exports = new authController();