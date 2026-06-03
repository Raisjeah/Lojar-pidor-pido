import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  isPrimary: { type: Boolean, default: false },
  alt: { type: String }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isNewItem: {
    type: Boolean,
    default: false,
  },
  isBestSeller: {
    type: Boolean,
    default: false,
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  images: [imageSchema],
  thumbnailUrl: {
    type: String, // Optimized thumbnail from Cloudinary
  },
  colors: [{ type: String }],
  sizes: [{ type: String }]
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
