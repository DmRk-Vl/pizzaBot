const { RTMClient } = require('@slack/rtm-api');
const { createMessageAdapter } = require('@slack/interactive-messages');
const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_BOT_TOKEN;
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;

//Инициализируем
const rtm = new RTMClient(token);
const web = new WebClient(token);
const slackInteractions = createMessageAdapter(slackSigningSecret);

module.exports.rtm = rtm;
module.exports.web = web;
module.exports.slackInteractions = slackInteractions;
