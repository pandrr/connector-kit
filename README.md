# connector-kit
connect things

start using `node main.js`

it will send simple websocket messages to clients connectes to `ws://localhost:8000`

it listens to:
- osc on port 9000
- mqtt on port 1883
- connected gamepads

websocket messages look for example like this:
```
{
  id:"service/xboxcontroller/button16",
  v:0.5435
}
```


todos:
- more inputs
- more outputs
- some kind of configuration for ports/services etc...
