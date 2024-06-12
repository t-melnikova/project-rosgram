const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../config");
const generateAccessToken = (username, roles) => {
  const payload = {
    username,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const username = req.body.username;
      const password = req.body.password;
      const candidate = await User.findOne({
        where: { username: username },
      });
      if (candidate) {
        return res
          .status(400)
          .json({ error: "Пользователь с таким именем уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({ username, password: hashPassword });
      await user.save();
      return res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const user = await User.findOne({
        where: { username: username },
      });
      if (!user) {
        return res
          .status(400)
          .json({ error: `Пользователь с таким ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: `Введен неверный пароль` });
      }
      const token = generateAccessToken(user.username, user.roles);
      return res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "error" });
    }
  }
}

module.exports = new AuthController();
