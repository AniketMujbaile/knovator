const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    active: Boolean,
    geoLocation: {
      latitude: Number,
      longitude: Number,
    },
  });
  
  postSchema.index({ geoLocation: '2dsphere' });

  const Post = mongoose.model('Post', postSchema);
  
  module.exports = Post;
