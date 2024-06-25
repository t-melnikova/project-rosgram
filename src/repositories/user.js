const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser(username, hashPassword) {
    return this.userModel.create({ username, password: hashPassword });
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

  async setAccessToken(userId, token) {
    const user = await this.userModel.findByPk(userId);
    user.tokens.accessToken = token;
    await user.changed("tokens", true);
    user.save();
  }
  async getTokens(userId) {
    const user = await this.userModel.findByPk(userId);
    return user.tokens;
  }
}

module.exports = new UserRepository(userModel);
