//const {validateComment} = require ("./validator");
const userService = require("../services/user");

class UserController {
  constructor(service) {
    this.service = service;
  }
  createUser = async (req, res) => {
    const data = req.body;
    const user = await this.service.createUser(data);
    if (user === "An error occurred") {
      res.status(500).json("Failed to create a user");
    }
    res.status(201).json(user);
  };

  getUserById = async (req, res) => {
    const { id } = req.param;
    const user = await this.service.getUserById(id);
    if (user === "An error occurred") {
      res.status(400).json("Could not find a user with such id");
    }
    res.status(200).json(user);
  };

  getAllUsers = async (req, res) => {
    const user = await this.service.getAllUsers();
    if (user === "An error occurred") {
      res.status(500).json("Unable to find users");
    }
    res.status(200).json(user);
  };

  updateUserById = async (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    const user = await this.service.updateUserById(updatedUser, userId);
    if (user === "An error occurred") {
      res.status(500).json("Failed to update the user");
    }
    res.status(200).json(user);
  };

  deleteUser = async (req, res) => {
    const userId = req.params.id;
    const user = await this.service.deleteUser(userId);
    if (user === "An error occurred") {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  };
}

module.exports = new UserController(userService);
