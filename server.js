const express = require('express');
const app = express();
const http = require('http');
const PORT = 3000; //1000~9999
const server = http.createServer(app);
server.listen(PORT, console.log('serverstarted'));  //실행되는 코드