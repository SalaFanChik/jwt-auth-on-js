const jwt = require('jsonwebtoken');
const express = require('express');
require('dotenv').config();

const router = express.Router();

router.post("/token", async (req, res) => {
  const { refresh } = req.body;

  if (!refresh) {
    return res.status(401).json({ "detail": 'Refresh токен не предоставлен. Доступ запрещен.' });
  }

  try {
    const decodedRefresh = jwt.verify(refresh, process.env.JWT_REFRESH_SECRET);
    const userId = decodedRefresh.userId;

    const newAccessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });

    res.setHeader('Authorization', `Bearer ${newAccessToken}`);
    res.status(200).json({ "detail": 'Токен обновлен', access: newAccessToken });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ "detail": 'Ошибка при обновлении токена' });
  }
});

module.exports = router;
