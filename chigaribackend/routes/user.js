const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

const SECRET_KEY = "your_secret_key";

// User sign-up for Chigari (with mobile number)
router.post('/register', async (req, res) => {
    const { username, email, mobile, password } = req.body;

    if (!username || !email || !mobile || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, email, mobile, password) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, mobile, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

// User login
router.post('/login', (req, res) => {
    const { username, password } = req.body;  // Changed to search by username
    const query = 'SELECT * FROM users WHERE username = ?';  // Searching by username

    db.query(query, [username], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('User not found');

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send('Invalid credentials');

        // Generate a token with user ID and role (if available)
        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        
        // Send the response with the token and user role
        res.json({ token, role: user.role, id: user.id });
    });
});

// Student Registration (for studentregister table)
router.post('/studentregister', (req, res) => {
    const { name, mobile, age } = req.body;

    if (!name || !mobile || !age) {
        return res.status(400).json({ message: 'All fields are required for student registration' });
    }

    // Insert student details into 'studentregister' table
    const query = 'INSERT INTO studentregister (name, mobile, age) VALUES (?, ?, ?)';
    db.query(query, [name, mobile, age], (err, result) => {
        if (err) {
            console.error('Error inserting student:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'Student registered successfully' });
    });
});

// Middleware to verify JWT and get user information from the token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded; // Store user data in request
        next();
    });
};

// Get user profile - Fetch the logged-in user's details
router.get('/profile', verifyToken, (req, res) => {
    const userId = req.user.id; // Get the user ID from the decoded token

    const query = 'SELECT username, email, mobile FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user profile:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]); // Send the user details as the response
    });
});

module.exports = router;
