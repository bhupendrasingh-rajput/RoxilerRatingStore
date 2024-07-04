const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateSignup, validateLogin } = require('../utils/validators');

exports.signup = async (req, res) => {
    const { name, email, address, password } = req.body;

    const { error } = validateSignup(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, address, password: hashedPassword });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);

        await user.save();
        res.status(201).json({ token, role: user.role, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);

        res.json({ token, role: user.role, message: 'User LoggedIn successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
