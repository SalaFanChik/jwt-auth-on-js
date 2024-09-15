const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const refreshRoutes = require('./routes/refresh')
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/refresh', refreshRoutes);

const port = process.env.PORT || 4500;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
