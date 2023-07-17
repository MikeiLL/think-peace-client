# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Web Oscillator Resources

https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode

https://webaudioapi.com/samples/

## Web Audio Context

https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
https://developer.mozilla.org/en-US/docs/Web/API/DelayNode
https://developer.mozilla.org/en-US/docs/Web/API/GainNode
https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode

## Euclidean Beats Resource

https://blog.landr.com/euclidean-rhythms/

## Globals are set in App.tsx

window.wishHashtags = [
  "#peace",
  "#faith",
  etc...
]

## Deployment

For local development, `yarn start` and/or `python3 server.py`.

Server running on Heroku:

May have to run `git push heroku main` if automatic deploys not occurring.

`heroku git:remote -a APP` (where `APP` might be `thinkpeace`)
`heroku domain:add thinkpeace.app` and `heroku domain:add www.thinkpeace.app`

### Configs

`heroku config:set REACT_APP_GOOGLE_API_KEY=dbuIQY4wpPVbB8DO_p2-0blablabla`
`heroku config:set REACT_APP_ENDPOINT=http://think-peace.herokuapp.com`

### Switch organization/team:
`export HEROKU_ORGANIZATION=storybook`

### scale dyno quantity up or down
`heroku ps:scale web=1:Basic`

These commands will tell heroku to use two build steps:
`heroku buildpacks:set heroku/python`
`heroku buildpacks:add --index 1 heroku/nodejs`

See also https://devcenter.heroku.com/articles/nodejs-support#heroku-specific-build-steps

May also want `git push heroku main` if automatic deploys aren't working.

### For SSL

`heroku certs:auto:enable`
see: https://devcenter.heroku.com/articles/automated-certificate-management
Also `openssl s_client -connect thinkpeace.app:443`
