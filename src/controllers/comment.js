//const {validateComment} = require ("./validator");
const commentService = require("../services/comment");

class CommentController {
  constructor(service) {
    this.service = service;
  }
  createComment = async (req, res) => {
    try {
      const data = req.body;
      const comment = await this.service.createComment(data);
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Failed to create a comment" });
    }
  };

  getCommentById = async (req, res) => {
    try {
      const { id } = req.param;
      const comment = await this.service.getCommentById(id);
      res.status(200).json(comment);
    } catch (error) {
      res.status(400).json({ error: "Could not find a comment with such id" });
    }
  };

  getAllComments = async (req, res) => {
    try {
      const comment = await this.service.getAllComments();
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Unable to find comments" });
    }
  };

  updateCommentById = async (req, res) => {
    try {
      const commentId = req.params.id;
      const updatedComment = req.body;
      const comment = await this.service.updateCommentById(
        updatedComment,
        commentId,
      );
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Failed to update the comment" });
    }
  };

  deleteComment = async (req, res) => {
    try {
      const commentId = req.params.id;
      const comment = await this.service.deleteComment(commentId);
      res.json(comment);
    } catch (error) {
      return res.status(404).json({ error: "Comment not found" });
    }
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
