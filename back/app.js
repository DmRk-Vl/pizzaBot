const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const spaRouter = require("./routes/spaRouter.js");
const cors = require('cors');
const conversation = require('./controllers/newOrderController.js');
const slackAPI = require('./slackAPI.js');

const rtm = slackAPI.rtm;
const slackInteractions = slackAPI.slackInteractions;

app.use(bodyParser.json());
app.use(cors())

app.use("/api/", spaRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

const port = process.env.PORT || 3000;

(async () => {
  const server = await slackInteractions.start(port);
  console.log(`Сервер запущен. Порт ${server.address().port}.`);
})();

(async () => {
  await rtm.start();
})();

mongoose.connect("mongodb://localhost:27017/pizzaBot", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(4000, function(){
        console.log("Сервер запущен. Порт 4000.");
    });
});

process.on("SIGINT", () => {
    mongoose.disconnect();
    process.exit();
});
