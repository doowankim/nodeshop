const mongoose = require('mongoose');

//데이터 객체(schema:데이터 항목)
const productSchema = mongoose.Schema({
    name: {type: String, required: true}, //required는 필수 값
    price: {type: String, required: true}
});

module.exports = mongoose.model("Product", productSchema); //model이 가장 최상위, mlab에서 뜨는건 products라고 뜸
