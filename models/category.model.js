const mongoose = require('mongoose');
const { Schema } = mongoose
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const schema = new mongoose.Schema(
  {
    name: String,
    parent: String,
    position: Number,
    status: String,
    avatar: String,
    description: String,
    createdBy: String,
    updatedBy: Array,
    slup: {
      type: String,
      slug: "name",
      unique: true, // để slug là duy nhất
    },
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

const Category = mongoose.model('Category', schema, 'categories')

module.exports = Category