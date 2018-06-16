# Dock

## First time setup

1. get a now api token from https://zeit.co/account/tokens
2. generate a `hook-token` used to verify web-hooks
3. set up secrets in now

    now secret add dock-now-token <now-token>
    now secret add dock-hook-token <hook-token>

## Set up a personal ci server

deploy a copy of `dock` providing secrets

    now -e NOW_TOKEN=@dock-now-token -e HOOK_TOKEN=@dock-hook-token billymoon/dock

which provides a webhook akin to...

    https://<personal-dock-url>/<namespace>/<repo>/<hook-token>/<alias>

which will run...

    now -t <now-token> alias $(now -t <now-token> <namespace>/<repo>) <alias>
