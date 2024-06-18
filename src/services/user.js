const userRepository = require("../repositories/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const generateAccessToken = (username) => {
  const payload = {
    username,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.errorMessage = "An error occurred";
  }

  async createUser(data) {
    try {
      return await this.userRepository.createUser(data);
    } catch (error) {
      console.log(error);
      throw this.errorMessage;
    }
  }

  async getAllUsers() {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error) {
      console.log(error);
      throw this.errorMessage;
    }
  }

  async getUserById(id) {
    try {
      return await this.userRepository.getUserById(id);
    } catch (error) {
      console.log(error);
      throw this.errorMessage;
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
      console.log(error);
      throw this.errorMessage;
    }
  }
  async deleteUser(userId) {
    try {
      return await this.userRepository.deleteUser(userId);
    } catch (error) {
      console.log(error);
      throw this.errorMessage;
    }
  }
  async findUser(username) {
    try {
      return await this.userRepository.findUser(username);
    } catch (error) {
      console.log(error);
      throw this.errorMessage;
    }
  }

  async registration(username, password) {
    try {
      const hashPassword = bcrypt.hashSync(password, 7);
      return await this.userRepository.registration({
        username,
        password: hashPassword,
      });
    } catch (error) {
      console.log(error);
      throw this.errorMessage;
    }
  }

  async login(user) {
    try {
      const token = generateAccessToken(user.username);
      return { token };
    } catch (error) {
      console.log(error);
      throw this.errorMessage;
    }
  }
}

module.exports = new UserService(userRepository);
