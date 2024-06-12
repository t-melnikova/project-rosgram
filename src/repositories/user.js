const userModel = require("../models/userModel");

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
}

module.exports = new UserRepository(userModel);
