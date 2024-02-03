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

// Get posts based on latitude and longitude
const getPostsByLocation = async (req, res) => {
    try {
        console.log('Request Body:', req.query);
      const { latitude, longitude } = req.query;

      if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
      }
  
      // Assuming a radius of 1 degree for simplicity. You can customize the radius based on your needs.
      const radius = 1;
  
      const posts = await Post.find({
        'geoLocation.latitude': { $gte: latitude - radius, $lte: latitude + radius },
        'geoLocation.longitude': { $gte: longitude - radius, $lte: longitude + radius },
      });
  
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts by location:', error);
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
};

 