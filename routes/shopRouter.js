const router = require('express').Router();

const Shop = require('../controller/shopController');
const autentiksi = require('../middlewares/authenticate');

router.post('/', autentiksi, Shop.createShop);
router.get('/', Shop.findShops);
router.patch('/:id', Shop.updateShop);
router.delete('/:id', Shop.deleteShop);

module.exports = router;
