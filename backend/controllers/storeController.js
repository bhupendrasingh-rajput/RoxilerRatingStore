const Store = require('../models/storeModel');
const Rating = require('../models/ratingModel');

exports.addStore = async (req, res) => {
    const { name, email, address } = req.body;

    try {
        const store = new Store({ name, email, address });
        await store.save();
        res.status(201).json({ message: 'Store added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllStores = async (req, res) => {
    try {
        const stores = await Store.find().populate('ratings');
        res.json(stores);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
