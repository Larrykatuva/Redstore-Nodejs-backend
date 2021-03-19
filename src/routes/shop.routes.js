const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const ShopController = require('../controllers/Shop.Controller');

router.get('/', authenticateToken, ShopController.getUserShop);
router.post('/create', authenticateToken, ShopController.createNewShop);
router.post('/update', authenticateToken, ShopController.updateShop);
router.get('/delete', authenticateToken, ShopController.deleteShop);

module.exports = router;