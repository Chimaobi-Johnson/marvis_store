const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema({
  image: { type: String, required: true },
  imageId: { type: String, required: true },
  title: { type: String, required: true },
  subheading: { type: String },
  body: { type: String, required: true },
  tags: [ String ],
  status: { type: String, default: 'publish' },
  comments: [
    {
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		}
  ],
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('post', postSchema);
