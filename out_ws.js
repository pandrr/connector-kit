var colors = require('colors/safe');
const WebSocket = require('ws');

var OutWebSocket=function()
{
    this.port=8000;
    this._websocket=null;
    this._clients=[];
}

OutWebSocket.prototype.start=function()
{
    const wss = new WebSocket.Server(
        {
            port: this.port,
            perMessageDeflate: false
        });

    console.log(colors.cyan('starting websocket server on port '+this.port));


    // todo: on disconnect remove client from _clients array

    wss.on('connection', function connection(websock)
    {
        console.log(colors.yellow('[websocket] client has connected! ('+this._clients.length+')'));
    
        this._clients.push(websock);

        websock.on('message', function incoming(message)
        {
            // console.log('received: %s', message);
        });

    }.bind(this));
}


OutWebSocket.prototype.send=function(msg)
{
    var str=JSON.stringify(msg);

    for(var i=0;i<this._clients.length;i++)
    {
        this._clients[i].send(str);
    }

}

module.exports.OutWebSocket=OutWebSocket;