const postRepository = require("../repositories/post");
const commentRepository = require("../repositories/comment");
class PostService {
  constructor(postRepository, commentRepository) {
    this.postRepository = postRepository;
    this.commentRepository = commentRepository;
    this.errorMessage = "An error occurred";
  }

  async createPost(data) {
    try {
      return await this.postRepository.createPost(data);
    } catch (error) {
      console.log(error);
      throw this.errorMessage;
    }
  }

  async getAllPosts() {
    try {
      return await this.postRepository.getAllPosts();
    } catch (error) {
      console.log(error);
      throw this.errorMessage;
    }
  }

  async getPostByIdWithComments(postId) {
    try {
      const post = await this.postRepository.getPostById(postId);
      post.comments =
        await this.commentRepository.getAllCommentsByPostId(postId);
      return post;
    } catch (error) {
      console.log(error);
      throw this.errorMessage;
    }
  }

  async deletePost(postId) {
    try {
      return await this.postRepository.deletePost(postId);
    } catch (error) {
      console.log(error);
      throw this.errorMessage;
    }
  }

  async updatePostById(updatedPost, postId) {
    try {
      const result = await this.postRepository.updatePostById(
        updatedPost,
        postId,
      );
      const updatedRowsCount = result[0];
      const updatedPostInstance = result[1][0];
      if (updatedRowsCount > 0) {
        return updatedPostInstance;
      }
    } catch (error) {
      console.log(error);
      throw this.errorMessage;
    }
  }
}

module.exports = new PostService(postRepository, commentRepository);
