const express = require('express');
const router = express.Router();

const productsController = require('../controllers/ProdcutsController')

router.get('/create',productsController.createProduct)
router.get('/:slug', productsController.getProductDetail)
router.get('/', productsController.getAllProducts)
router.post('/store', productsController.storeProduct)

module.exports = router;
