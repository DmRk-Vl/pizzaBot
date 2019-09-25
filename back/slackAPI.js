const { RTMClient } = require('@slack/rtm-api');
const { createMessageAdapter } = require('@slack/interactive-messages');
const { WebClient } = require('@slack/web-api');

const token = 'xoxb-759067883878-754448417585-wXBFerJRdJTbTuaIXgD11gIU';//process.env.SLACK_BOT_TOKEN; //'xoxb-759067883878-754448417585-wXBFerJRdJTbTuaIXgD11gIU';
const slackSigningSecret = '0c15f8573db6e33929f00e545e681139';//process.env.SLACK_SIGNING_SECRET; //'0c15f8573db6e33929f00e545e681139';

const rtm = new RTMClient(token);
const web = new WebClient(token);
const slackInteractions = createMessageAdapter(slackSigningSecret);

const port = process.env.PORT || 3000;

module.exports.rtm = rtm;
module.exports.web = web;
module.exports.slackInteractions = slackInteractions;
