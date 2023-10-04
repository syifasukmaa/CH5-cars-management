const router = require('express').Router();

const Product = require('../controller/productController');

router.get('/', Product.findProducts);
router.get('/:id', Product.findProductById);
router.post('/', Product.createProduct);
router.patch('/:id', Product.updateProduct);
router.delete('/:id', Product.deleteProduct);

module.exports = router;
