const userRepository = require("../repositories/user");
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.errorMessage = "An error occurred";
  }

  async createUser(data) {
    try {
      return await this.userRepository.createUser(data);
    } catch (error) {
      return this.errorMessage;
    }
  }

  async getAllUsers() {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error) {
      return this.errorMessage;
    }
  }

  async getUserById(id) {
    try {
      return await this.userRepository.getUserById(id);
    } catch (error) {
      return this.errorMessage;
    }
  }

  async deleteUser(userId) {
    try {
      return await this.userRepository.deleteUser(userId);
    } catch (error) {
      return this.errorMessage;
    }
  }

  async updateUserById(updatedUser, userId) {
    try {
      const result = await this.userRepository.updateUserById(
        updatedUser,
        userId,
      );
      const updatedRowsCount = result[0];
      const updatedUserInstance = result[1][0];
      if (updatedRowsCount > 0) {
        return updatedUserInstance;
      }
    } catch (error) {
      return this.errorMessage;
    }
  }
}

module.exports = new UserService(userRepository);
