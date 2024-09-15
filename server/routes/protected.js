// routes/protected.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Защищенный маршрут
router.get('/dashboard', authMiddleware, (req, res) => {
  res.status(200).json({ message: `Добро пожаловать, пользователь с ID: ${req.userId}` });
});

module.exports = router;
