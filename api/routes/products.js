const express = require('express');
const router = express.Router();


// read
router.get('/', (req, res) => { //=>진행하겠다는 뜻
   res.status(200).json({
       message: 'Handling GET requests to /products'
   });
});

// create
router.post('/', (req, res) => {
    res.status(200).json({
        msg: 'Successful post products'
    });
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