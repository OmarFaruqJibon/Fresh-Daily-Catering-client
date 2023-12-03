const itemModel = require("../models/itemModel");


const getItemController = async (req, res) => {

    try {
        const items = await itemModel.find();
        res.status(200).send(items);

    } catch (error) {

        console.log(error);
    }
};

const addItemController = async (req, res) => {
    try {
        const newItem = new itemModel(req.body);
        await newItem.save();
        res.status(200).send("Item created successfully");
    } catch (error) {
        res.status(400).send(error)
    }
};


const editItemController = async (req, res) => {
    try {
        console.log(req.body);
        const { itemId } = req.body;
        await itemModel.findOneAndUpdate({ _id: itemId }, req.body, {
            new: true,
        });
        res.status(200).send("Item updated.")
    } catch (error) {
        res.status(400).send(error);
    }
}


const deleteItemController = async (req, res) => {
    try {
        const { itemId } = req.body;
        await itemModel.findOneAndDelete({ _id: itemId });
        res.status(200).send("Item updated.")
    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports = { getItemController, addItemController, editItemController, deleteItemController };