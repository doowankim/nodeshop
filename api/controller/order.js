const orderModel = require('../models/order'); //여기서 저장된 데이터는 ordermodel에 저장
const productModel = require('../models/product');


// order 등록
exports.orders_create_order = (req, res) =>{
    productModel
        .findById(req.body.product) //.findById : product ID를 검색
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

};

// order 전체데이터 불러오기
exports.orders_get_all = (req, res) =>{
    orderModel
        .find()
        .then(docs => {
            res.status(200).json({
                msg: 'Successful order data',
                orderCount: docs.length,
                orders: docs.map(doc => {
                    return{
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" +doc._id
                        }
                    }
                })

            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};

// oRder 상세데이터 불러오기
exports.orders_get_order = (req, res) => { // 한개의 데이터만 불러오는 것
    const id = req.params.orderId;
    orderModel
        .findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    msg: 'Successful detail data',
                    orderInfo: {
                        product: doc.product,
                        _id: doc._id,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: "http://localhost:3000/orders/"
                        }
                    }
                });
            }
            else {
                res.json({
                    msg: 'No data'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

};

// order update
exports.orders_update_order = (req, res) => {
    const id = req.params.orderId;
    const updateOps = {};

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    orderModel
        .update({id:_id}, {$set: updateOps})
        .then( result => {
            res.status(200).json({
                msg: 'Successful update order data',
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" +id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

// order delete
exports.orders_delete_order = (req, res) => {
    orderModel
        .remove({
            _id: req.params.orderId
        })
        .then( result => {
            res.status(200).json({
                msg: 'Successful delete order data',
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders",
                    body: {product: 'String', quantity: 'String'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};