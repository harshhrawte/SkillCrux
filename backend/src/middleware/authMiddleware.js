const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    // FIXED: use the correct secret key
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await userModel.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    return next();
  } catch (error) {
    console.log("JWT ERROR:", error);
    const status = error.name === 'JsonWebTokenError' ? 401 : 500;
    return res.status(status).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;

