const billModel = require("../models/billsModel");

const addBillController = async (req, res) => {
    try {
        const newBill = new billModel(req.body);
        await newBill.save();
        res.status(200).send("Bill created successfully");
    } catch (error) {
        res.status(400).send(error)
    }
};

const getBillController = async (req, res) => {
    try {
        const bills = await billModel.find();
        res.send(bills);

    } catch (error) {
        console.log(error);
    }
};

module.exports = { addBillController, getBillController };