const express = require("express");
const spaController = require("../controllers/spaController.js");
const spaRouter = express.Router();

spaRouter.use("/getorders", spaController.getOrders);
spaRouter.use("/putorder", spaController.putOrder);

module.exports = spaRouter;
