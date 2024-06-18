//const {validatePost} = require ("./validator");
const postService = require("../services/post");

class PostController {
  constructor(service) {
    this.service = service;
  }

  createPost = async (req, res) => {
    try {
      const data = req.body;
      const post = await this.service.createPost(data);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to create a post" });
    }
  };

  getAllPosts = async (req, res) => {
    try {
      const post = await this.service.getAllPosts();
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: "Unable to find posts" });
    }
  };

  getPostByIdWithComment = async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await this.service.getPostByIdWithComments(postId);
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({ error: "Could not find a post with such id" });
    }
  };

  updatePostById = async (req, res) => {
    try {
      const postId = req.params.id;
      const updatedPost = req.body;
      const post = await this.service.updatePostById(updatedPost, postId);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to update the post" });
    }
  };

  deletePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await this.service.deletePost(postId);
      res.json(post);
    } catch (error) {
      return res.status(404).json({ error: "Post not found" });
    }
  };
}
module.exports = new PostController(postService);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// router.get("/", async (req, res) => {
//   try {
//     const posts = await Post.findAll();
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
//
// const postNewPostController = async (req, res) => {
//   const newPost = req.body;
//   try {
//     const createdPost = Post.create(newPost);
//     res.json(createdPost);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// router.post("/", postNewPostController);
//
// router.delete("/:id", async (req, res) => {
//   const postId = req.params.id;
//   try {
//     const deletedRowsCount = await Post.destroy({ where: { id: postId } });
//     if (deletedRowsCount > 0) {
//       res.json({ message: `Post with ID ${postId} deleted successfully` });
//     } else {
//       res.status(404).json({ error: "Post not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
//
// router.put("/:id", async (req, res) => {
//   const postId = req.params.id;
//   const updatedPost = req.body;
//   try {
//     const [updatedRowsCount, [updatedPostInstance]] = await Post.update(
//       updatedPost,
//       {
//         where: { id: postId },
//         returning: true,
//       },
//     );
//     if (updatedRowsCount > 0) {
//       res.json(updatedPostInstance);
//     } else {
//       res.status(404).json({ error: "Post not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
//
// router.get("/:postId", async (req, res) => {
//   const { postId } = req.params;
//   try {
//     const post = await Post.findByPk(postId, { include: Comment });
//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }
//     res.json(post);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
