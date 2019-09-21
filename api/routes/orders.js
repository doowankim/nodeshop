const express = require('express');
const router = express.Router();
const orderModel = require('../models/order'); //여기서 저장된 데이터는 ordermodel에 저장
const productModel = require('../models/product');



//read
router.get('/',(req, res) =>{
   res.status(200).json({
       message: 'Successful Order'
   });
});

// create
router.post('/',(req, res) =>{
    productModel
        .findById(req.body.product)
        .then(product => {
            if (!product) { //!는 부정의 뜻
                return res.status(404).json({
                    msg: 'Product not found'
                });
            }
            else {
                const order = new orderModel({
                    product: req.body.product,
                    quantity: req.body.quantity
                });
                return order.save();
            }
        })
        .then(result => {
            res.status(200).json({
                msg: 'Successful post order',
                createdOrder: {
                    product: result.product,
                    quantity: result.quantity,
                    _id: result._id
                }
            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

    // const order = new orderModel({
    //     product: req.body.product,
    //     quantity: req.body.quantity
    // });
    // order
    //     .save()
    //     .then(result => {
    //         res.status(200).json({
    //             msg: 'Successful post order',
    //             createdOrder: result
    //         });
    //
    //     })
    //     .catch(err => {
    //         res.status(500).json({
    //             error: err
    //         });
    //     });
});


// update
router.patch('/',(req, res) => {
   res.status(200).json({
      msg: 'Successful patch order'
   });
});


// delete
router.delete('/',(req, res) => {
    res.status(200).json({
        msg: 'Successful delete order'
    });
});





module.exports = router;