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
    '/posts/location',
    authenticate,
    [
      query('latitude').isNumeric().withMessage('Latitude must be a number'),
      query('longitude').isNumeric().withMessage('Longitude must be a number'),
    ],
    postController.getPostsByLocation
  );


module.exports = router;

// const express = require('express');
// const router = express.Router();
// const postController = require('../controllers/postController');
// const authenticateToken = require('../middleware/authenticateToken');
 
// // Create a new post
// router.post('/posts', authenticateToken, postController.createPost);

// // Get all posts for the authenticated user
// router.get('/posts', authenticateToken, postController.getUserPosts);

// // Get a specific post
// router.get('/posts/:postId', authenticateToken, postController.getPostById);

// // Update a post
// router.put('/posts/:postId', authenticateToken, postController.updatePost);

// // Delete a post
// router.delete('/posts/:postId', authenticateToken, postController.deletePost);

// module.exports = router;
