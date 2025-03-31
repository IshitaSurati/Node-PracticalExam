const Blog = require('../models/blog');

// Create Blog Post
async function createBlog(req, res) {
    const { title, content } = req.body;
    try {
        const newBlog = new Blog({ title, content, author: req.user.userId });
        await newBlog.save();
        res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get All Blogs
async function getAllBlogs(req, res) {
    try {
        const blogs = await Blog.find().populate('author', 'name');
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get Blog by ID
async function getBlogById(req, res) {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id).populate('author', 'name');
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update Blog
async function updateBlog(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        if (blog.author.toString() !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        blog.title = title;
        blog.content = content;
        await blog.save();
        res.status(200).json({ message: 'Blog updated successfully', blog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete Blog
async function deleteBlog(req, res) {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        if (blog.author.toString() !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        await blog.deleteOne();
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
