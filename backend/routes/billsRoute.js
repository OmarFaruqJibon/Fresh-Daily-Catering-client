const express = require("express");
const { addBillController, getBillController } = require('../controllers/billsController');

const router = express.Router();


/**
 * @ api {post}   create bill
 */
router.post('/create-bill', addBillController);

/**
 * @ api {get}   get bill
 */
router.get('/get-bill', getBillController);



module.exports = router;