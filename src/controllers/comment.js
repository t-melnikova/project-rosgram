//const {validateComment} = require ("./validator");
const commentService = require("../services/comment");

class CommentController {
  constructor(service) {
    this.service = service;
  }
  createComment = async (req, res) => {
    const data = req.body;
    const comment = await this.service.createComment(data);
    if (comment === "An error occurred") {
      res.status(500).json("Failed to create a comment");
    }
    res.status(201).json(comment);
  };

  getCommentById = async (req, res) => {
    const { id } = req.param;
    const comment = await this.service.getCommentById(id);
    if (comment === "An error occurred") {
      res.status(400).json("Could not find a comment with such id");
    }
    res.status(200).json(comment);
  };

  getAllComments = async (req, res) => {
    const comment = await this.service.getAllComments();
    if (comment === "An error occurred") {
      res.status(500).json("Unable to find comments");
    }
    res.status(200).json(comment);
  };

  updateCommentById = async (req, res) => {
    const commentId = req.params.id;
    const updatedComment = req.body;
    const comment = await this.service.updateCommentById(
      updatedComment,
      commentId,
    );
    if (comment === "An error occurred") {
      res.status(500).json("Failed to update the comment");
    }
    res.status(200).json(comment);
  };

  deleteComment = async (req, res) => {
    const commentId = req.params.id;
    const comment = await this.service.deleteComment(commentId);
    if (comment === "An error occurred") {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  };
}

module.exports = new CommentController(commentService);

// router.post("/", async (req, res) => {
//   const newComment = req.body;
//   try {
//     const createdComment = await Comment.create(newComment);
//     res.json(createdComment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
//
// router.get("/", async (req, res) => {
//   try {
//     const comments = await Comment.findAll();
//     res.json(comments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
//
// router.put("/:id", async (req, res) => {
//   const commentId = req.params.id;
//   const updatedComment = req.body;
//   try {
//     const [updatedRowsCount, [updatedCommentInstance]] = await Comment.update(
//       updatedComment,
//       {
//         where: { id: commentId },
//         returning: true,
//       },
//     );
//     if (updatedRowsCount > 0) {
//       res.json(updatedCommentInstance);
//     } else {
//       res.status(404).json({ error: "Comment not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
//
// router.delete("/:id", async (req, res) => {
//   const commentId = req.params.id;
//   try {
//     const deletedRowsCount = await Comment.destroy({
//       where: { id: commentId },
//     });
//     if (deletedRowsCount > 0) {
//       res.json({
//         message: `Comment with ID ${commentId} deleted successfully`,
//       });
//     } else {
//       res.status(404).json({ error: "Comment not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
