const express = require('express');
const router = express.Router();
//camel naming(중간에 대문자)
const productModel = require('../models/product'); //../(..cd)와 ./(같은레벨의 파일)


// read
router.get('/', (req, res) => { //=>진행하겠다는 뜻
   res.status(200).json({
       message: 'Handling GET requests to /products'
   });
});

// create
router.post('/', (req, res) => {

    const product = new productModel({
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            res.status(200).json({
                msg: 'Created product',
                createdProduct: result
            }); //화면에 뿌려주는 것
        }) //성공했을경우 실행
        .catch(err => {
            res.status(500).json({
                error: err  //(error)는 본인이 정하는 것 err는 서버에서 내려주는 것
            })
        }); //const product에 에러가 났을경우에 catch에서 실행

    // const product = {
    //     name2: req.body.name,
    //     price2: req.body.price
    // };
    //
    //
    // res.status(200).json({
    //     msg: 'Successful post products',
    //     createdProduct: product
    // });
});

// update
router.patch('/', (req, res) => {
    res.status(200).json({
        msg: 'Successful patch products'
    });
});

//delete
router.delete('/', (req, res) => {
    res.status(200).json({
        msg: 'Successful delete products'
    });
});



module.exports = router; //Router 기능을 내보내주는 것