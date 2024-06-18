//const {validateComment} = require ("./validator");
const userService = require("../services/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

class UserController {
  constructor(service) {
    this.service = service;
  }
  createUser = async (req, res) => {
    try {
      const data = req.body;
      const user = await this.service.createUser(data);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create a user" });
    }
  };

  getUserById = async (req, res) => {
    try {
      const { id } = req.param;
      const user = await this.service.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: "Could not find a user with such id" });
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const user = await this.service.getAllUsers();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Unable to find users" });
    }
  };

  updateUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUser = req.body;
      const user = await this.service.updateUserById(updatedUser, userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to update the user" });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await this.service.deleteUser(userId);
      res.json(user);
    } catch (error) {
      return res.status(404).json({ error: "User not found" });
    }
  };
  registration = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const username = req.body.username;
      const password = req.body.password;
      const candidate = await this.service.findUser(username);
      if (candidate) {
        return res
          .status(400)
          .json({ error: "Пользователь с таким именем уже существует" });
      }
      const user = await this.service.registration(username, password);
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Registration error" });
    }
  };
  login = async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const user = await this.service.findUser(username);
      if (!user) {
        return res
          .status(400)
          .json({ error: `Пользователь с таким ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: `Введен неверный пароль` });
      }
      const token = await this.service.login(user);
      return res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Login error" });
    }
  };
}

module.exports = new UserController(userService);
