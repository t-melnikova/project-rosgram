const postModel = require("../models/postModel");

class PostRepository {
  constructor(postModel) {
    this.postModel = postModel;
  }

  async getAllPosts() {
    return await this.postModel.findAll();
  }
  async getPostById(postId) {
    return await this.postModel.findByPk(postId);
  }

  async createPost(data) {
    return this.postModel.create(data);
  }

  async deletePost(postId) {
    return await this.postModel.destroy({ where: { id: postId } });
  }

  async updatePostById(updatedPost, postId) {
    return await this.postModel.update(updatedPost, {
      where: { id: postId },
      returning: true,
    });
  }
}

module.exports = new PostRepository(postModel);
