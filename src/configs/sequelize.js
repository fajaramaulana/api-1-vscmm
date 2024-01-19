const dotenv = require('dotenv');
const {Sequelize} = require('sequelize');

dotenv.config();

const sequelizeCon = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      port: process.env.DB_PORT,
      logging: console.log,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
);

module.exports = sequelizeCon;
