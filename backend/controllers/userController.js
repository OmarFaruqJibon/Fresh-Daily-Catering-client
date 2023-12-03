const userModal = require("../models/userModel");


const loginController = async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await userModal.findOne({ userId, password, verified: true });
        console.log("user: ", user);
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.json({
                message: "Login Fail",
                user,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const registerController = async (req, res) => {
    try {
        const newUser = new userModal({ ...req.body, verified: true });
        await newUser.save();
        res.status(200).send("User register successfully");
    } catch (error) {
        res.status(400).send(error)
    }
};




module.exports = { loginController, registerController };