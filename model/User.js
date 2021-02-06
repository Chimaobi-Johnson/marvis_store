const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  image: { type: String, required: true },
  imageId: { type: String, required: true },
  firstName: {
    type: String,
    required: true
    },
  lastName: {
    type: String,
    required: true
    },
  gender: {
    type: String,
    required: true
    },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'suscriber'
  },
  resetToken: String,
  resetTokenExpiration: Date,
  posts: [
    {
			type: Schema.Types.ObjectId,
			ref: 'Post'
		}
  ],
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});


module.exports = mongoose.model('User', userSchema);