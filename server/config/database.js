const { Sequelize } = require('sequelize');
require('dotenv').config();


const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;


const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false,
});

module.exports = sequelize;
