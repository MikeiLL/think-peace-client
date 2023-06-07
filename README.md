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

Server running on Heroku:

`heroku git:remote -a APP` (where `APP` might be `thinkpeace`)

### scale dyno quantity up or down
`heroku ps:scale web=1:Basic`
