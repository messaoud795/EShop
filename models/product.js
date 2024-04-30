const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceeds 100 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter a product price'],
    default: 0,
    maxlength: [5, 'Product price cannot exceeds 5 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please enter a product description'],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please enter a product category'],
    enum: [
      {
        values: [
          'Electronics',
          'Cameras',
          'Laptops',
          'Headphones',
          'Food',
          'books',
          'shoes',
          'sport',
          'home',
        ],
        message: 'Please select a correct category',
      },
    ],
  },
  seller: {
    type: String,
    required: [true, 'Please enter a product seller'],
  },
  stock: {
    type: Number,
    required: [true, 'Please enter a product stock'],
    default: 0,
    maxlength: [5, 'Product stock cannot exceeds 5 characters'],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  Reviews: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
