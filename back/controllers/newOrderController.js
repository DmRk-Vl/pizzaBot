const Order = require("../models/order.js");
const slackAPI = require('./../slackAPI.js');

const rtm = slackAPI.rtm;
const web = slackAPI.web;
const slackInteractions = slackAPI.slackInteractions;

//Привязываем слушателя на событие message.
rtm.on('message', (event) => {
  const conversationId = event.channel;

  if (event.text == 'pizzaBot' || event.text == 'пицца бот'){
    (async () => {
      //Отправляем меню пользователю.
      const result = await web.chat.postMessage({
        "channel": conversationId,
        "blocks": [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "Оп-оп! Здравствуй, мой сладенький любитель пиццы! \nСобственно, меню перед тобой. Не стесняйся :3"
              }
            },
            {
              "type": "divider"
            },

            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "*Дженнифер* \n Состав: Копченая курица, творожный сыр, кабачки, свежие шампиньоны, помидоры, сыр, соус сырный, соус пикантный, дрожжевое тесто."
              },
              "accessory": {
                "type": "image",
                "image_url": "https://pizzerio.ru/upload/iblock/9c7/Dzhennifer_site.jpg",
                "alt_text": "Дженнифер"
              }
            },
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "Вы можете заказать вкуснейшую пиццу *Дженнифер* прямо сейчас: "
              },
              "accessory": {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Заказать",
                },
                "value": "Jennifer"
              }
            },
            {
              "type": "divider"
            },

            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "*Вашингтон* \n Состав: говядина су-вид, курица, помидоры, сыр, петрушка, укроп, соус пикантный с зернистой горчицей, дрожжевое тесто."
              },
              "accessory": {
                "type": "image",
                "image_url": "https://pizzerio.ru/upload/iblock/ed1/MG_6659.jpg",
                "alt_text": "Вашингтон"
              }
            },
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "Вы можете заказать вкуснейшую пиццу *Вашингтон* прямо сейчас: "
              },
              "accessory": {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Заказать",
                },
                "value": "Washington"
              }
            },
            {
              "type": "divider"
            },
        ]
      });
    })();
  }

  let pizzaName;
  //Назначаем оброботчик на нажатие по кнопке.
  slackInteractions.action({ type: 'button' }, (payload, respond) => {
    pizzaName = payload.actions[0].value;
    //Открываем диалог.
    dialogOpen(payload.trigger_id, pizzaName);
  });
  //Назначаем оброботчик на отправку диалога.
  slackInteractions.action({ type: 'dialog_submission' }, (payload, respond) => {
    let order = new Order({
      pizzaName: pizzaName,
      pizzaSize: payload.submission.pizzaSize,
      adress:    payload.submission.adress,
      status:    "new",
      channelId: payload.channel.id,
    });
    //Добавляем новый заказ в базу данных.
    order.save(function(err){
      if(err){
        return console.log(err);
      }
    });

    //Уведомпляем пользователя, что его заказ принят.
    const result = web.chat.postMessage({
      "channel": conversationId,
      text: "Ваш заказ принят в обработку!) \n Спасибо, что выбрали нас)",
    });
  });
});

//Открывает диалоговое окно.
function dialogOpen(triggerId, pizzaName) {
  (async () => {
    const result = await web.dialog.open({
      trigger_id: triggerId,
      dialog: {
        callback_id: "pizzaBot-1",
        title: `Пицца ${convertNameForUser(pizzaName)}`,
        submit_label: "Заказать!",
        elements: [{
          type: "select",
          label: "Размер круга:",
          placeholder: "Выберите размер...",
          name: "pizzaSize",
          options:
            [
              {
                label: "Большой",
                value: "big",
              },
              {
                label: "Средний",
                value: "middle",
              },
              {
                label: "Маленький",
                value: "smol",
              }
            ]
          },
          {
            type: "text",
            label: "Adress",
            placeholder: "Укажите Ваш адресс...",
            name: "adress",
          }
        ]
      },
    });
  })();
}

//Преобразует название пиццы с латиницы в кириллицу.
function convertNameForUser(pizzaName) {
  switch (pizzaName) {
    case "Jennifer": {
      return "Дженифер";
    }
    case "Washington": {
      return "Вашингтон";
    }
    default: {
      return "Чет сломалось, сорри";
    }
  }
}
