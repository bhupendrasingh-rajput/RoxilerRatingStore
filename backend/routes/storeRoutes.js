const express = require('express');
const { addStore, getAllStores } = require('../controllers/storeController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', protect, addStore);
router.get('/', protect, getAllStores);

module.exports = router;
