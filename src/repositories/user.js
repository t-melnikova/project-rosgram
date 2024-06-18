const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser(data) {
    return this.userModel.create(data);
  }

  async getAllUsers() {
    return this.userModel.findAll();
  }

  async getUserById(id) {
    return this.userModel.findByPk(id);
  }

  async updateUserById(updatedUser, userId) {
    return this.userModel.update(updatedUser, {
      where: { id: userId },
      returning: true,
    });
  }

  async deleteUser(userId) {
    return this.userModel.destroy({ where: { id: userId } });
  }
  async findUser(username) {
    return this.userModel.findOne({
      where: { username: username },
    });
  }
  async registration(username, password, hashPassword) {
    const user = new userModel({ username, password: hashPassword });
    await user.save();
    return user;
  }
}

module.exports = new UserRepository(userModel);
