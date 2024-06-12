const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const role = sequelize.define("role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    defaultValue: "user",
  },
});

module.exports = role;
