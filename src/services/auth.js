const userRepository = require("../repositories/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");
class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  generateAccessToken(username) {
    const payload = {
      username,
    };
    return jwt.sign(payload, secret, { expiresIn: "24h" });
  }

  async checkAuthorization(userId, token) {
    const tokens = this.userRepository.getTokens(userId);
    if (!tokens.accessToken) {
      throw new Error("User haven't access token");
    }
    if (tokens.accessToken !== token) {
      throw new Error("Access token invalid");
    }
  }
}
module.exports = new AuthService(userRepository);
