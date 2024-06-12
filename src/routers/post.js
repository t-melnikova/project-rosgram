const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getPostByIdWithComment);

router.post("/", postController.createPost);

router.put("/:id", postController.updatePostById);

router.delete("/:id", postController.deletePost);

module.exports = router;
