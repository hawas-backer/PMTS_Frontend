const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['Student', 'Alumni', 'Coordinator', 'Advisor'],
    required: true,
  },
  name: { type: String }, // Optional, for CreateStudentAccount
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);