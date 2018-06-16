let exec;_d21‍.w('child_process',[["exec",function(v){exec=v}]]);let send;_d21‍.w('micro',[["send",function(v){send=v}]]);


_d21‍.d(async (req, res, { query: { repo, token, alias } }) => {
  if (token === process.env.HOOK_TOKEN && /^\w+\/\w+$/.test(repo) && /^[a-zA-Z0-9.-]+$/.test(alias)) {
    send(res, 200)

    const deployWithAlias = `now -t ${nowToken} alias $(now -t ${nowToken} ${repo}) ${alias}`
    const deploy = `now -t ${nowToken} ${repo}`
    const cmd = alias ? deployWithAlias : deploy

    try {
      exec(cmd)
    } catch (err) {
      throw Error(err)
    }
  } else {
    send(res, 400)
  }
});
