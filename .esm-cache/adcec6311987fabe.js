_198‍.e([["message",()=>message]]);let Slack;_198‍.w('slack',[["default",function(v){Slack=v}]]);

const token = process.env.SLACK_BOT_TOKEN
const slack = new Slack({ token })

const message = txt => slack.chat.postMessage({
  token: process.env.SLACK_BOT_TOKEN,
  channel: 'robot-rock',
  text: txt
})
