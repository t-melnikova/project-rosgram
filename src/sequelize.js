const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('homework', 'homework', 'hw001', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

module.exports = sequelize;