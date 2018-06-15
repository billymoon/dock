import Slack from 'slack'

const token = process.env.SLACK_BOT_TOKEN
const slack = new Slack({ token })

export const message = txt => slack.chat.postMessage({
  token: process.env.SLACK_BOT_TOKEN,
  channel: 'robot-rock',
  text: txt
})
