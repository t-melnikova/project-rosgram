const commentRepository = require("../repositories/comment");
class CommentService {
  constructor(commentRepository) {
    this.commentRepository = commentRepository;
    this.errorMessage = "An error occurred";
  }

  async createComment(data) {
    try {
      return await this.commentRepository.createComment(data);
    } catch (error) {
      return this.errorMessage;
    }
  }

  async getAllComments() {
    try {
      return await this.commentRepository.getAllComments();
    } catch (error) {
      return this.errorMessage;
    }
  }

  async getCommentById(id) {
    try {
      return await this.commentRepository.getCommentById(id);
    } catch (error) {
      return this.errorMessage;
    }
  }

  async deleteComment(commentId) {
    try {
      return await this.commentRepository.deleteComment(commentId);
    } catch (error) {
      return this.errorMessage;
    }
  }

  async updateCommentById(updatedComment, commentId) {
    try {
      const result = await this.commentRepository.updateCommentById(
        updatedComment,
        commentId,
      );
      const updatedRowsCount = result[0];
      const updatedCommentInstance = result[1][0];
      if (updatedRowsCount > 0) {
        return updatedCommentInstance;
      }
    } catch (error) {
      return this.errorMessage;
    }
  }
}

module.exports = new CommentService(commentRepository);
