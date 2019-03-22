# connector-kit
connect things

start using `node main.js`

it will send simple websocket messages to clients connectes to `ws://localhost:8000`

it listens to:
- osc on port 9000
- mqtt on port 1883
- connected gamepads

messages look like this:
```
{
  id:"service/someUniqueId/",
  v:0.5435
}
```
