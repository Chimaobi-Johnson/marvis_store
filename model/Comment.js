const mongoose = require('mongoose')
const { Schema } = mongoose;

const commentSchema = new Schema({
  commentText: { type: String, required: true },
  commenter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('comment', commentSchema);
