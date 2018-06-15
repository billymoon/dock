import { exec } from 'child_process'
import { send } from 'micro'

export default async (req, res, { query: { repo, token, alias } }) => {
  if (/^[a-zA-Z0-9]+$/.test(token) && /^\w+\/\w+$/.test(repo) && /^[a-zA-Z0-9.-]+$/.test(alias)) {
    send(res, 200)

    const deployWithAlias = `now -t ${token} alias $(now -t ${token} ${repo}) ${alias}`
    const deploy = `now -t ${token} ${repo}`
    const cmd = alias ? deployWithAlias : deploy

    try {
      exec(cmd)
    } catch (err) {
      throw Error(err)
    }
  } else {
    send(res, 400)
  }
}
