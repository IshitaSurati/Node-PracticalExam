const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secretKey = 'your_secret_key';

// Register
async function register(req, res) {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Login
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Logout
function logout(req, res) {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
}

module.exports = { register, login, logout };

