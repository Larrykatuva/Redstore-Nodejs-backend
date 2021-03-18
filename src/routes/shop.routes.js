const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const ShopController = require('../controllers/Shop.Controller');


router.post('/create-shop', authenticateToken, ShopController.createNewShop);
router.post('/update-shop', authenticateToken, ShopController.updateShop);

module.exports = router;