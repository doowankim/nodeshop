const express = require('express');
const router = express.Router();
//camel naming(중간에 대문자)

const checkAuth = require('../middleware/check-auth');
const productController = require('../controller/product');


// total read(2)
router.get('/', productController.products_get_all);

//detail product read

router.get('/:productId', checkAuth, productController.products_get_product);

// create(1)
router.post('/', checkAuth, productController.products_create_product);

// update
router.patch('/:productId', productController.products_update_product);

//delete
router.delete('/:productId', productController.products_delete_product);



module.exports = router; //Router 기능을 내보내주는 것