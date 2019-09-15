const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { //=>진행하겠다는 뜻
   res.status(200).json({
       message: 'Handling GET requests to /products'
   });
});


module.exports = router; //Router 기능을 내보내주는 것