let exec;_4c6‍.w('child_process',[["exec",function(v){exec=v}]]);let send,json;_4c6‍.w('micro',[["send",function(v){send=v}],["json",function(v){json=v}]]);let message;_4c6‍.w('../slack',[["message",function(v){message=v}]]);





const nowToken = process.env.NOW_TOKEN

_4c6‍.d(async (req, res, { query: { repo, token, alias } }) => {
  const nowDeployHandler = async url => {
    console.log(`Deployed to: ${url}`)

    const { stdout, stderr } = await exec(`now -t ${nowToken} alias '${url}' ${alias}`)

    stderr.on('data', console.log)
    stdout.on('data', console.log)
    stdout.on('close', () => message(`deploy succeeded for ${url}`))
  }

  let data

  try {
    data = await json(req)
    console.log(JSON.stringify(data, null, 2))
  } catch (err) {
    console.log('no body data\n')
  }

  if (token === process.env.HOOK_TOKEN && /^\w+\/\w+$/.test(repo) && /^[a-zA-Z0-9.-]+$/.test(alias)) {
    message(`deploy started for ${alias}`)
    send(res, 200)

    try {
      const { stdout, stderr } = await exec(`now -t ${nowToken} ${repo}`)

      let url

      stderr.on('data', console.log)
      stdout.on('data', data => {
        url = data
        message(`deploy will be available on ${url}`)
      })
      stdout.on('close', () => nowDeployHandler(url))
    } catch (err) {
      message(`deploy failed for ${alias}`)
      throw err
    }

  } else {
    message(`deploy failed (malformed) for ${alias}`)
    send(res, 400)
  }
});
