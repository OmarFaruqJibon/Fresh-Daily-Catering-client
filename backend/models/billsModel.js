const mongoose = require('mongoose');

const billSchema = mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
        },
        customerContact: {
            type: String,
            required: true,
        },
        customerAddress: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        billerName: {
            type: String,
            required: true,
        },
        billerId: {
            type: String,
            required: true,
        },
        totalBill: {
            type: Number,
            required: true,
        },
        totalItems: {
            type: Number,
            required: true,
        },
        cartItems: {
            type: Array,
            required: true
        },
        date: {
            type: Date,
            default: Date.now(),
        },
    },

    { timestamp: true }
);

const Bills = mongoose.model("Bills", billSchema);

module.exports = Bills;