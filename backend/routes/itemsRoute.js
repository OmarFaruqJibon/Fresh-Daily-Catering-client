const express = require("express");
const { getItemController, addItemController, editItemController } = require('../controllers/itemsController');

const router = express.Router();


/**
 * @ api {get}   get all items
 */
router.get("/get-item", getItemController);


/**
 * @ api {post}   get all items
 */
router.post('/add-item', addItemController);


/**
 * @ api {post}   edit items
 */
router.put('/edit-item', editItemController)



module.exports = router;