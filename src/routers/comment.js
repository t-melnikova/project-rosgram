const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");

router.get("/", commentController.getAllComments);

router.get("/:id", commentController.getCommentById);

router.post("/", commentController.createComment);

router.put("/:id", commentController.updateCommentById);

router.delete("/:id", commentController.deleteComment);

module.exports = router;
