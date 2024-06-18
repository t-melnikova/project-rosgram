const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { check } = require("express-validator");

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUserById);

router.delete("/:id", userController.deleteUser);

router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль не должен быть больше 4 и меньше 10 символов",
    ).isLength({ min: 4, max: 10 }),
  ],
  userController.registration,
);

router.post("/login", userController.login);

module.exports = router;
