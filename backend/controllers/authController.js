// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const signup = async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function(err) {
        if (err) return res.status(500).send("Error registering user");
        res.status(201).send("User registered successfully");
    });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err || !user) return res.status(400).send("Invalid credentials");
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).send("Invalid credentials");

        const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    });
};

module.exports = { signup, login };
