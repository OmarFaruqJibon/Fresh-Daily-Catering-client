const express = require('express');
const connectDB = require('./config/config');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

//dotenv config
dotenv.config();

connectDB();

//rest object
const app = express();

//middleware

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//routes
app.get("/", (req, res) => {
    res.send("<h1>Backend is running<h1/>");
});


app.use('/api/items', require('./routes/itemsRoute'));















//Listen
app.listen(PORT, () => {
    console.log(`Server in running on port ${PORT}`);
});









































