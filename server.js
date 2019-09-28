const express = require('express');  //const: 상수, var: 변수
const app = express();
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


const db = 'mongodb://teddykwak:k9915402@ds141294.mlab.com:41294/node-rest-shop';
//const db = 'mongodb+srv://doowankim:qwer1234@cluster0-m6o3g.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB Connected..."))//성공했을 경우
    .catch(err => console.log(err));//실패했을 경우 에러를 잡는다

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false})); //bodyparser 사용자 입력값을 쉽게 만들어주는 것
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);




const PORT = 3000; //1000~9999
const server = http.createServer(app);
server.listen(PORT, console.log('serverstarted'));  //실행되는 코드