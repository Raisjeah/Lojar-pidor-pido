import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  distrito: { type: String, required: true },
  subDistrito: { type: String, required: true },
  patokanLokasi: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // Optional for Google OAuth users
    required: function() { return this.provider === 'local'; }
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  avatar: {
    url: { type: String },
    publicId: { type: String }
  },
  addresses: [addressSchema],
  googleId: {
    type: String,
    unique: true,
    sparse: true // Allows multiple null values for local users
  },
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
