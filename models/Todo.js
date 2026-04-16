const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Todo title is required'],
    trim: true,
    minlength: [1, 'Title must be at least 1 character long'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true  // ✅ Ye automatically createdAt aur updatedAt add karega
});

// ✅ Remove this pre-save middleware if using timestamps: true
// todoSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

module.exports = mongoose.model('Todo', todoSchema);