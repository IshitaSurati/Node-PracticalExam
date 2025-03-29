// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const path = require('path');
const DBconnect = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

// Home Route
app.get('/', (req, res) => {
    res.render('articleList');
});

// Server Listening
app.listen(8090, () => {
    console.log(`Server running on http://localhost:8090`);
});
DBconnect();
