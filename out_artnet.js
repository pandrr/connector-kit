var colors = require('colors/safe');
const ArtNet=require('artnet');
// var Message = require("./message").Message;

var OutArtNet=function()
{
    this.artnet=null;
    this.options = {
        host: '172.16.23.15'

        // host (Default "255.255.255.255")
        // port (Default 6454)
        // refresh (millisecond interval for sending unchanged data to the Art-Net node. Default 4000)
        // iface (optional string IP address - bind udp socket to specific network interface)
        // sendAll (sends always the full DMX universe instead of only changed values. Default false)
    }
}

OutArtNet.prototype.start=function()
{
    console.log(colors.cyan('starting artnet send to '+this.options.host));

    this.artnet = ArtNet(this.options);
}

OutArtNet.prototype.send=function(msg)
{
    // var str=JSON.stringify(msg);
    // console.log('artnet!!!',msg.v);

    var uniChan=msg.id.split(",");
    var v=msg.v;

    this.artnet.set( parseInt(uniChan[0]),parseInt(uniChan[1]), v,function()
    {
        console.log('artnet msg send!');
    });
    // for(var i=0;i<this._clients.length;i++)
    // {
    //     if (this._clients[i].readyState !== WebSocket.OPEN) { 
    //         console.log(colors.red('[websocket] client '+i+' readystate ',this._clients[i].readyState));
    //         continue;
    //       } 
    
    //     this._clients[i].send(str);
    // }

}

module.exports.OutArtNet=OutArtNet;