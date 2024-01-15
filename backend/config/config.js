const mongoose = require('mongoose');

const connectDB = async () => {

    try {

        // const connect = await mongoose.connect(process.env.MONGO_URI);

        const connect = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gqaks.mongodb.net/POS?retryWrites=true&w=majority`);

        console.log(`Database connected with ${connect.connection.host}`);

    } catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit(1);
    }

};

module.exports = connectDB;
// export default connectDB;

