const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const orderController = require('../controller/order');


//total read (2)
router.get('/',checkAuth, orderController.orders_get_all);

// detail read (3)
router.get('/:orderId', checkAuth, orderController.orders_get_order);

// create (1)
router.post('/',checkAuth, orderController.orders_create_order);


// update
router.patch('/:orderId', checkAuth, orderController.orders_update_order);


// delete
router.delete('/:orderId',checkAuth, orderController.orders_delete_order);





module.exports = router;