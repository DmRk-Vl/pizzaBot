const Order = require("../models/order.js");
const slackAPI = require('./../slackAPI.js');

const web = slackAPI.web;

exports.sendNotification = async function(status, channelId) {
  await web.chat.postMessage({
    text: `Хей! Статус твоего заказа был изменен! \nНовый статус: ${convertStatusForUser(status)}.`,
    channel: channelId
  });
};

function convertStatusForUser(status) {
  switch (status) {
    case "rejected": {
      return "Отменен";
    }
    case "completed": {
      return "Завершен";
    }
    case "confirmed": {
      return "Подтвержден";
    }
    case "new": {
      return "Новый";
    }
    default: {
      return "ERROR";
    }
  }
}
