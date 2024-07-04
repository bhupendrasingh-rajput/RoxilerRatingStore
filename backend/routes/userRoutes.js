const express = require('express');
const { getAllUsers, addUser, submitRating } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', protect, addUser);
router.get('/', protect, getAllUsers);
router.post('/rate', protect, submitRating);

module.exports = router;
