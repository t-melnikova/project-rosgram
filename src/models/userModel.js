const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const user = sequelize.define("user", {
  // id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   primaryKey: true,
  // },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roles: {
    type: DataTypes.STRING,
  },
});

module.exports = user;
// user.belongsToMany(role, { through: "UserRoles" });
// role.belongsToMany(user, { through: "UserRoles" });

// user.prototype.setRole = async function (roleValue) {
//   const role = await role.findOne({ where: { value: roleValue } });
//   if (role) {
//     this.roles = role.value;
//     await this.save();
//   } else {
//     throw new Error("Role not found");
//   }
// };
// const User = require("./userModel");
//
// (async () => {
//   const user = await User.findByPk(1); // Получаем пользователя по его ID
//
//   try {
//     await user.setRole("admin"); // Устанавливаем роль "admin" пользователю
//     console.log("Role set successfully");
//   } catch (error) {
//     console.error("Error setting role:", error.message);
//   }
// })();
