const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Схема mongoose, определяющая заказ.
const orderScheme = new Schema({
    pizzaName: String,
    pizzaSize: String,
    adress: String,
    status: String,
    channelId: String,
}, { versionKey: false });

module.exports = mongoose.model("Order", orderScheme);
