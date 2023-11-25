const express = require('express');
const router = express.Router();

const productsController = require('../controllers/ProdcutsController')


// get /all
// get detail id
// put slug
// poost /
// dele slug
router.get('/all', productsController.getProductsList)
router.get('/create',productsController.createProduct)
router.get('/update',productsController.updateProduct)
router.get('/:id', productsController.getProductDetail)
router.put('/:slug', productsController.update)
// router.get('/', productsController.getAllProducts)
router.post('/', productsController.storeProduct)
router.delete('/:slug',productsController.deleteProduct)

module.exports = router;
