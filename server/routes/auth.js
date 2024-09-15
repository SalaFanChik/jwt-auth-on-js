const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    console.log(password)
    console.log("hashed:", hashedPassword)
    console.log("user.hashed:", user.password)
    user.refreshToken = refreshToken;
    await user.save();


    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.setHeader('x-refresh-token', refreshToken); // Используем кастомный заголовок для refresh токена

    res.status(201).json({"username": username, "access": accessToken, "refresh": refreshToken });
  } catch (error) {
    console.log(error)
    res.status(400).json({ "detail": 'Ошибка при создании пользователя'});
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ "detail": 'Пользователь не найден' });
    }
    console.log()
    console.log()
    console.log(password)
    console.log(user.password)
    
    // Сравнение введённого пароля с сохранённым хэшированным паролем
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ "detail": 'Неверный пароль' });
    }
    

    // Генерация токенов
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    user.refreshToken = refreshToken;
    await user.save();

    // Отправляем токены в заголовках
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.setHeader('x-refresh-token', refreshToken); // Используем кастомный заголовок для refresh токена

    res.status(200).json({"username": username, "access": accessToken, "refresh": refreshToken });
  } catch (error) {
    res.status(500).json({ "detail": 'Ошибка сервера' });
  }
});

module.exports = router;
