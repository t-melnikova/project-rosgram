const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const authMiddleware = require("../middlewares/auth");

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getPostByIdWithComment);

router.post("/", authMiddleware, postController.createPost);

router.put("/:id", postController.updatePostById);

router.delete("/:id", postController.deletePost);

module.exports = router;
