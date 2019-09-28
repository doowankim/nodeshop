const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}, //mongoose의 자동생성되는 product의 id 값을 넣어줘라
    //price: { type: mongoose.Schema.Types.}
    quantity: { type: Number, default: 1} //default는 값을 넣지않으면 Value값이 1이 됨
});

module.exports = mongoose.model("order", orderSchema);





// const mongoose = require('mongoose');
//
// //데이터 객체(schema:데이터 항목)
// const productSchema = mongoose.Schema({
//     name: {type: String, required: true}, //required는 필수 값
//     price: {type: String, required: true}
// });
//
// module.exports = mongoose.model("Product", productSchema); //model이 가장 최상위, mlab에서 뜨는건 products라고 뜸
