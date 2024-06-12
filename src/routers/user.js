const express = require("express");
const router = express.Router();
const commentController = require("../controllers/user");

router.get("/", commentController.getAllUsers);

router.get("/:id", commentController.getUserById);

router.post("/", commentController.createUser);

router.put("/:id", commentController.updateUserById);

router.delete("/:id", commentController.deleteUser);

module.exports = router;
