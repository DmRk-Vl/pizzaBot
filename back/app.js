const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const spaRouter = require("./routes/spaRouter.js");
const cors = require('cors');
const conversation = require('./controllers/newOrderController.js');
const slackAPI = require('./slackAPI.js');

const app = express();

//Инициализация rtm, slackInteractions и web вынесена в одтельный файл.
const rtm = slackAPI.rtm;
const slackInteractions = slackAPI.slackInteractions;

app.use(bodyParser.json());
app.use(cors())

//Сопоставляем роутер с localhost:4000/api/.
app.use("/api/", spaRouter);

//Обрабатываем ошибку 404.
app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

const port = process.env.PORT || 3000;

//Начинаем прослушивать порт для slackIteractions.
(async () => {
  //Запускаем сервер
  const server = await slackInteractions.start(port);
  console.log(`Сервер запущен. Порт ${server.address().port}.`);
})();

//Подключаемся к slack.
(async () => {
  await rtm.start();
})();

//Подключаемся к базе даннных.
mongoose.connect("mongodb://localhost:27017/pizzaBot", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(4000, function(){
        console.log("Сервер запущен. Порт 4000.");
    });
});

//При завершении отключаемся от базы даннных.
process.on("SIGINT", () => {
    mongoose.disconnect();
    process.exit();
});
