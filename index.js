// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const path = require('path');
const DBconnect = require('./config/db');
const { authenticateToken } = require('./middlewares/authMiddleware');
const Blog = require('./models/blog');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

console.log('Views Path:', path.join(__dirname, 'views'));

// Routes
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

// Home Route with articles rendering
app.get('/', authenticateToken, async (req, res) => {
    try {
        const articles = await Blog.find().populate('author', 'name');
        const user = req.user || null;
        res.render('articleList', { articles, user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading articles');
    }
});

// Server Listening
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Database Connection
DBconnect();
