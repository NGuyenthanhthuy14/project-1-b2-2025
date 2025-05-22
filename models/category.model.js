const mongoose = require('mongoose');
const { Schema } = mongoose

const schema = new mongoose.Schema (
  {
    name: String,
    parent: String,
    position: Number,
    status: String,
    avatar: String,
    description: String,
    createdBy: String,
    updatedBy: Array,
    slup: String,
    deleted: {
      type: Boolean,
      default: false, // trạng thái chưa bị chuyển vào thùng giác.

    },
    deletedBy: String,
    deleteAt: Date
  }, 
  {
      timestamps: true, // Tự động sinh ra trường createdAt và updatedAt
  }
)

const Category = mongoose.model ('Category', schema, 'categories')

module.exports = Category