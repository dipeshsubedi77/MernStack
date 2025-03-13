const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema creation

const blogSchema = new Schema(
    {
        title: {
            type: String,
            unique: true,
            required: true
        },
        subtitle: {
            type: String
        },
        description: {
            type: String, // ✅ Changed from Text to String
            required: true
        },
        image: {
            type: String
        }
    },
    { timestamps: true } // ✅ This will automatically add createdAt & updatedAt fields
);

const Blog = mongoose.model('Blog', blogSchema); // Model creation

module.exports = Blog;
