const { readFileSync } = require('fs')
const { exec } = require('child_process')

const { send } = require('micro')
const slack = require('slack')

const secrets = JSON.parse(process.env.DOCK_SECRETS)

const message = text => slack.chat.postMessage({
  token: secrets.SLACK_BOT_TOKEN,
  channel: 'robot-rock',
  text
})

const now = `now -t ${secrets.NOW_TOKEN}`
const README = readFileSync('README.md', 'utf8')

message('starting dock server')

module.exports = async (req, res) => {
  if (req.url === '/favicon.ico') { send(res, 204); return }
  
  const [discard, user, project, token, alias] = req.url.split('/')
  const cmd = `${now} alias $(${now} -e DOCK_SECRETS=@dock-secrets ${user}/${project}) ${alias}`

  message(`deploy started for ${user}/${project} to ${alias}`)
  
  if (token === process.env.HOOK_TOKEN) {
    send(res, 200)
    await exec(cmd)
    message(`deploy complete for ${user}/${project} to ${alias}`)
  } else {
    if (process.env.NODE_ENV === 'production') {
      send(res, 403, README)
    } else {
      send(res, 200, cmd)
    }
  }
}