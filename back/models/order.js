const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderScheme = new Schema({
    pizzaName: String,
    pizzaSize: String,
    adress: String,
    status: String,
    channelId: String,
}, { versionKey: false });

module.exports = mongoose.model("Order", orderScheme);
