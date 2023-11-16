const express = require('express');
const router = express.Router();

const productsController = require('../controllers/ProdcutsController')

router.get('/create',productsController.createProduct)
router.get('/update',productsController.updateProduct)
router.get('/:slug', productsController.getProductDetail)
router.get('/:id/edit', productsController.editProduct)
router.put('/:id', productsController.update)
router.get('/', productsController.getAllProducts)
router.post('/store', productsController.storeProduct)
// router.delete('/:id',productsController.deleteProduct)

module.exports = router;
