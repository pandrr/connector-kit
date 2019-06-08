const colors = require('colors/safe');
const WebSocket = require('ws');

var InWS=function(output)
{
    this.port=8800;
    this._websocket=null;
    this._clients=[];

    console.log(colors.cyan("starting input websocket on port "+this.port));


    const wss = new WebSocket.Server(
        {
            port: this.port,
            perMessageDeflate: false
        });

      
    wss.on('connection', function connection(websock)
    {
        console.log(colors.yellow('[websocket] client has connected! ('+this._clients.length+')'));
        this._clients.push(websock);
        this._logNumClients();

        websock.on('close', function close() {
            console.log(colors.red('[websocket] client disconnected'));
            this._removeClient(websock);
          }.bind(this));
    
        websock.on('message', function incoming(message)
        {
            console.log('received: %s', message);
        });
        websock.on('error', function(error) {
            if(error != null) {
             console.log('error: %s', error);
             this._removeClient(websock);
             websock.close();
             websock._socket.destroy();
             Client.splice(findClient(websock.upgradeReq.url));
             
        }
      }.bind(this));
    }.bind(this));
}

InWS.prototype._logNumClients=function(ws)
{
    console.log(colors.cyan('[websocket] numclients '+this._clients.length));
}

InWS.prototype._removeClient=function(ws)
{
    this._clients.splice(this._clients.indexOf(ws));
    this._logNumClients();
}

module.exports.InWS=InWS;
