const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { check } = require("express-validator");

router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль не должен быть больше 4 и меньше 10 символов",
    ).isLength({ min: 4, max: 10 }),
  ],
  authController.registration,
);
router.post("/login", authController.login);
router.get("/users", authController.getUsers);

module.exports = router;
