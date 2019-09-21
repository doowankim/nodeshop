const mongoose = require('mongoose');

//데이터 객체(schema:데이터 항목)
const productSchema = mongoose.Schema({
    name: String,
    price: String
});

module.exports = mongoose.model("Product", productSchema); //model이 가장 최상위
