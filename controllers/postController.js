const { validationResult } = require('express-validator');
const Post = require('../model/post');

// Create a new post
const createPost = async (req, res) => {
  // Validate request using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, body, active, latitude, longitude } = req.body;
    const createdBy = req.user._id; // Assuming user ID is stored in req.user after authentication

    const newPost = new Post({
      title,
      body,
      active,
      createdBy,
      geoLocation: { latitude, longitude },
    });

    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all posts for the authenticated user
const getUserPosts = async (req, res) => {
  try {
    const userPosts = await Post.find({ createdBy: req.user._id });
    res.json(userPosts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific post
const getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId, createdBy: req.user._id });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const { title, body, active, latitude, longitude } = req.body;
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.postId, createdBy: req.user._id },
      { title, body, active, geoLocation: { latitude, longitude } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.postId,
      createdBy: req.user._id,
    });

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get posts by location (latitude and longitude)
const getPostsByLocation = async (req, res) => {
    try {
      const { latitude, longitude } = req.params;
  
      const posts = await Post.find({
        geoLocation: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
            $maxDistance: 1000, // Within 1000 meters (adjust as needed)
          },
        },
      });
  
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Get count of active and inactive posts
const getPostCounts = async (req, res) => {
    try {
      const activeCount = await Post.countDocuments({ active: true });
      const inactiveCount = await Post.countDocuments({ active: false });
  
      res.json({ activeCount, inactiveCount });
    } catch (error) {
      console.error('Error fetching post counts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
  createPost,
  getUserPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByLocation,
  getPostCounts,
 };

 