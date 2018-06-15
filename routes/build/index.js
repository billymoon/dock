import { send, json } from 'micro'
import { exec } from 'child_process'

export default async (req, res, { query: { repo, token, alias } }) => {
  const nowDeployHandler = async url => {
    console.log(`Deployed to: ${url}`)

    const { stdout, stderr } = await exec(`now -t ${token} alias '${url}' fiona`)

    stderr.on('data', console.log)
    stdout.on('data', console.log)
  }

  let data

  try {
    data = await json(req)
    console.log(JSON.stringify(data, null, 2))
  } catch (err) {
    process.stderr.write('no body data\n')
  }

  if (/^[a-zA-Z0-9]+$/.test(token) && /^\w+\/\w+$/.test(repo) && /^[a-zA-Z0-9.-]+$/.test(alias)) {
    send(res, 200)

    try {
      const { stdout, stderr } = await exec(`now -t ${token} ${repo}`)

      let url

      stderr.on('data', console.log)
      stdout.on('data', data => url = data)
      stdout.on('close', () => nowDeployHandler(url))
    } catch (err) {
      throw err
    }

  } else {
    send(res, 400)
  }
}
