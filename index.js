const { readFileSync } = require('fs')
const { exec } = require('child_process')
const { send } = require('micro')

const now = `now -t ${process.env.NOW_TOKEN}`
const README = readFileSync('README.md', 'utf8')

module.exports = async (req, res) => {
  if (req.url === '/favicon.ico') { send(res, 204); return }
  const [discard, user, project, token, alias] = req.url.split('/')
  const cmd = `${now} alias $(${now} ${user}/${project}) ${alias}`
  
  if (token === process.env.HOOK_TOKEN) {
    send(res, 200)
    exec(cmd)
  } else {
    if (process.env.NODE_ENV === 'production') {
      send(res, 403, README)
    } else {
      send(res, 200, cmd)
    }
  }
}