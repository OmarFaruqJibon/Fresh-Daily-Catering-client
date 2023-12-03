const express = require("express");
const { getItemController, addItemController, editItemController, deleteItemController } = require('../controllers/itemsController');

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
 * @ api {put}   edit items
 */
router.put('/edit-item', editItemController)

/**
 * @ api {post}   delete items
 */
router.post('/delete-item', deleteItemController)



module.exports = router;