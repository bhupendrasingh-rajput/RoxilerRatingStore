const User = require('../models/userModel');
const Store = require('../models/storeModel');
const Rating = require('../models/ratingModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.addUser = async (req, res) => {
    const { name, email, address, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, address, password: hashedPassword, role });

        await user.save();
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.submitRating = async (req, res) => {
    const { storeId, rating } = req.body;
    const userId = req.user.userId;

    try {
        const store = await Store.findById(storeId);
        if (!store) return res.status(404).json({ error: 'Store not found' });

        const newRating = new Rating({ user: userId, store: storeId, rating });
        await newRating.save();

        store.ratings.push(newRating);
        await store.save();

        res.status(201).json({ message: 'Rating submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
