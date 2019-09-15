const express = require('express');
const app = express();
const http = require('http');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// app.use((req, res) => {
//   res.status(200).json({
//       message: 'It works!' //key: value (C: Create, R: Read, U: Update, D: Delete)를 하는 것
//   });
// });


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);




const PORT = 3000; //1000~9999
const server = http.createServer(app);
server.listen(PORT, console.log('serverstarted'));  //실행되는 코드