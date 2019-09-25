const express = require("express");
const spaController = require("../controllers/spaController.js");
const spaRouter = express.Router();

//Назначаем маршрутам соответствующие обработчики в контроллере. 
spaRouter.use("/getorders", spaController.getOrders);
spaRouter.use("/putorder", spaController.putOrder);

module.exports = spaRouter;
