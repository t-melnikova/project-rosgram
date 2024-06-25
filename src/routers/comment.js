const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");
const authMiddleware = require("../middlewares/auth");

router.get("/", commentController.getAllComments);

router.get("/:id", commentController.getCommentById);

router.post("/", authMiddleware, commentController.createComment);

router.put("/:id", commentController.updateCommentById);

router.delete("/:id", commentController.deleteComment);

module.exports = router;
