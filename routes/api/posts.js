const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

//POST api/posts
//create new post

router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//GET api/posts
//get all posts

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//GET api/posts/:post_id
//get ;post by id

router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//DELETE api/posts/:post_id
//get all posts

router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post was removed" });
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//PUT api/posts/like/:id
//Like a post

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { likes } = post;

    //Check if the post has already been liked by user

    if (likes.find(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post has already liked" });
    }

    likes.unshift({ user: req.user.id });
    await post.save();

    res.json(likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//PUT api/posts/unlike/:id
//Unlike a post

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { likes } = post;

    if (
      likes.find(like => like.user.toString() === req.user.id) === undefined
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    const likeToRemoveIdx = likes.findIndex(
      ({ user }) => user.toString() === req.user.id
    );

    const newLikes = [
      ...likes.slice(0, likeToRemoveIdx),
      ...likes.slice(likeToRemoveIdx + 1)
    ];

    post.likes = newLikes;
    await post.save();

    res.json(likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//POST api/posts/comment/:id
//create comment

router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//DELETE api/posts/comment/:id/:comment_id
//delete comment

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { comments } = post;

    const comment = comments.find(({ id }) => id === req.params.comment_id);

    if (!comment)
      return res.status(404).json({ msg: "Comment does not exist" });

    //user can only delete comment if comment was created by him
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const CommentToRemoveIdx = comments.findIndex(
      ({ id }) => id === comment.id
    );

    const newComments = [
      ...comments.slice(0, CommentToRemoveIdx),
      ...comments.slice(CommentToRemoveIdx + 1)
    ];

    post.comments = newComments;
    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});
module.exports = router;
