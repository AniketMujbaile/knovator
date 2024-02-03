const express = require('express');
const { body, query} = require('express-validator');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticate = require('../middleware/authenticateToken');

// Create a new post
router.post(
  '/posts',
  authenticate,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('body').notEmpty().withMessage('Body is required'),
    body('active').isBoolean().withMessage('Active must be a boolean'),
    body('latitude').isNumeric().withMessage('Latitude must be a number'),
    body('longitude').isNumeric().withMessage('Longitude must be a number'),
  ],
  postController.createPost
);

// Get all posts for the authenticated user
router.get('/posts', authenticate, postController.getUserPosts);

// Get a specific post
router.get('/posts/:postId', authenticate, postController.getPostById);

// Update a post
router.put(
  '/posts/:postId',
  authenticate,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('body').notEmpty().withMessage('Body is required'),
    body('active').isBoolean().withMessage('Active must be a boolean'),
    body('latitude').isNumeric().withMessage('Latitude must be a number'),
    body('longitude').isNumeric().withMessage('Longitude must be a number'),
  ],
  postController.updatePost
);

// Delete a post
router.delete('/posts/:postId', authenticate, postController.deletePost);

// Get posts based on latitude and longitude
router.get(
    '/posts/location/:latitude/:longitude',
    authenticate,
    [
      query('latitude').isNumeric().withMessage('Latitude must be a number'),
      query('longitude').isNumeric().withMessage('Longitude must be a number'),
    ],
    postController.getPostsByLocation
  );

// Get count of active and inactive posts
router.get('/posts/count', authenticate, postController.getPostCounts);

module.exports = router;

 