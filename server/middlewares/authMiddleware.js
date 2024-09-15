const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User'); 

const authMiddleware = async (req, res, next) => {
  // Извлечение токенов из заголовка Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ "detail": 'Токен не предоставлен. Доступ запрещен.' });
  }

  // Разделение заголовка на тип и токен
  const [bearer, accessToken] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !accessToken) {
    return res.status(401).json({ "detail": 'Неверный формат заголовка Authorization. Доступ запрещен.' });
  }

  try {
    // Проверка access токена
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // Проверка refresh токена, если access токен истек
      const refreshToken = req.headers['x-refresh-token']; // Используем кастомный заголовок для refresh токена

      if (!refreshToken) {
        return res.status(401).json({ "detail": 'Refresh токен не предоставлен. Доступ запрещен.' });
      }

      try {
        const user = await User.findOne({ where: { refreshToken } });
        if (!user) {
          return res.status(401).json({ "detail": 'Неверный или истекший refresh токен' });
        }

        const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        if (decodedRefresh.userId !== user.id) {
          return res.status(401).json({ "detail": 'Неверный refresh токен' });
        }

        const newAccessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const newRefreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        user.refreshToken = newRefreshToken;
        await user.save();

        res.setHeader('Authorization', `Bearer ${newAccessToken}`);
        res.setHeader('x-refresh-token', newRefreshToken);

        req.userId = user.id;
        return next();
      } catch (refreshError) {
        return res.status(401).json({ "detail": 'Неверный или истекший refresh токен' });
      }
    }
    return res.status(401).json({ "detail": 'Неверный или истекший токен' });
  }
};

module.exports = authMiddleware;
