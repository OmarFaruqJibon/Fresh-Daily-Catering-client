const express = require("express");
const { loginController, registerController } = require('../controllers/userController');

const router = express.Router();


/**
 * @ api {get}   login
 */
router.post("/login", loginController);


/**
 * @ api {post}   register
 */
router.post('/register', registerController);



module.exports = router;