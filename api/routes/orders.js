const express = require('express');
const router = express.Router();





//read
router.get('/',(req, res) =>{
   res.status(200).json({
       message: 'Successful Order'
   });
});

// create
router.post('/',(req, res) =>{
    res.status(200).json({
        message: 'Successful post order'
    });
});


// update
router.patch('/',(req, res) => {
   res.status(200).json({
      msg: 'Successful patch order'
   });
});


// delete
router.delete('/',(req, res) => {
    res.status(200).json({
        msg: 'Successful delete order'
    });
});





module.exports = router;