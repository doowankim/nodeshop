const productModel = require('../models/product'); //../(..cd)와 ./(같은레벨의 파일)


//product 전체 데이터 불러오기

exports.products_get_all = (req, res) => { //=>진행하겠다는 뜻
    productModel
        .find()
        .then(docs => {
            res.status(200).json({
                msg: 'Successful total data',
                productCount: docs.length,
                products: docs.map(doc => { //상세내용 클릭한 후 자세히보기
                    return{
                        name: doc.name,
                        _id: doc._id, //name, price, id중에 name, id만 보이는 것
                        request: { //상세페이지로 가는 것
                            type: "GET",
                            url: "http://localhost:3000/products/" +doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

    // res.status(200).json({
    //     message: 'Handling GET requests to /products'
    // });
};


// product 상세데이터 불러오기
exports.products_get_product = (req,res) => { //: 사용자 요청에 의한 ProductId
    const id = req.params.productId; //사용자 입력값이 있을경우에 url의 뒷부분이 parameters(localhost:3000/products/productId)
    productModel
        .findById(id)//find(): 배열로 받아옴, findById():
        .exec()
        //id값에 맞는 것을 화면에 뿌려줌
        .then(doc => { //then()은 실행하는 것
            if(doc){ //doc에 데이터가 있다면 실행
                res.status(200).json({
                    msg: 'Successful detail data',
                    // productInfo: doc

                    productInfo: {
                        name: doc.name,
                        price: doc.price,
                        id: doc._id,
                        request: { //상세페이지랑 전체페이지 왔다갔다하는 것을 자동화 시킨것
                            type: 'GET',
                            url: "http://localhost:3000/products/"
                        }
                    }
                });


            } else { //doc에 데이터가 없다면 실행
                res.json({
                    msg: 'no product id'
                });
            }
        })
        .catch(err => { //catch()는 에러가 있을 경우 실행하는 것
            res.json({
                error: err
            });
        });

};

// product create

exports.products_create_product = (req, res) => {

    const product = new productModel({
        name: req.body.name,
        price: req.body.price
    });

    product
        .save() //만든 데이터를 저장
        .then(result => {
            res.status(200).json({
                msg: 'Created product',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/products/" +result._id
                    }
                }
            }); //화면에 뿌려주는 것
        }) //성공했을경우 실행
        .catch(err => {
            res.status(500).json({
                error: err  //(error)는 본인이 정하는 것 err는 서버에서 내려주는 것
            })
        }); //const product에 에러가 났을경우에 catch에서 실행
};

//product update
exports.products_update_product = (req, res) => {
    const id = req.params.productId;

    const updateOps = {};
    //for문 req.body(사용자입력값)수 대로 ops로 넘어가면서 실행
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value; //name의 속성값이 바뀌는 것(바뀐 값이 updateOps로 들어감)
    }


    productModel
        .update({_id: id}, { $set: updateOps}) //$set에 updataops값을 넣어주는것
        .then( result => {
            res.status(200).json({
                msg: 'Successful update data',
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/products/" +id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

// product delete
exports.products_delete_product = (req, res) => {
    productModel
        .remove({
            _id: req.params.productId
        })
        .then(result => {
            res.status(200).json({
                msg: 'Successful product delete',
                request: {
                    type: 'POST',
                    url: "http://localhost:3000/products",
                    body: { name: 'String', price: 'String'}
                }
            });
        })
        .catch(err => {
            res.json({
                error: err
            });
        });
};