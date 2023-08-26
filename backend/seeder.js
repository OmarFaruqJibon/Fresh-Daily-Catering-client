const connectDB = require('./config/config');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const itemModel = require('./models/itemModel');

const data = require('./utills/data');



dotenv.config();
connectDB();


const importData = async () => {

    try {
        await itemModel.deleteMany();

        const itemsData = await itemModel.insertMany(data);
        console.log("all data are added");
        process.exit()

        
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}


importData();