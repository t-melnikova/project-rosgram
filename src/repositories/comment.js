const commentModel = require("../models/commentModel");

class CommentRepository {
  constructor(commentModel) {
    this.commentModel = commentModel;
  }

  async createComment(data) {
    return this.commentModel.create(data);
  }

  async getAllComments() {
    return this.commentModel.findAll();
  }

  async getCommentById(id) {
    return this.commentModel.findByPk(id);
  }

  async getAllCommentsByPostId(postId) {
    return this.commentModel.findAll({
      where: { postId: postId },
    });
  }

  async updateCommentById(updatedComment, commentId) {
    return this.commentModel.update(updatedComment, {
      where: { id: commentId },
      returning: true,
    });
  }

  async deleteComment(commentId) {
    return this.commentModel.destroy({ where: { id: commentId } });
  }
}

module.exports = new CommentRepository(commentModel);
