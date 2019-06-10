var colors = require('colors/safe');
const ArtNet=require('artnet');
// var Message = require("./message").Message;

var OutArtNet=function()
{
    this.artnet=null;
    this.options = {
        host: '192.168.0.98'

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

    // 1 strip pro universum 170 leds 510 channels

    var data=[];

    for(var i=0;i<170;i++)
    {
        data[i*3+0]=0;
        data[i*3+1]=0;
        data[i*3+2]=0;
    }

    this.artnet.set( 0,0, data,function()
    {
        console.log('artnet msg send!');
    });

    this.artnet.set( 1,0, data,function()
    {
        console.log('artnet msg send!');
    });




}


OutArtNet.prototype.send=function(msg)
{
    // var str=JSON.stringify(msg);
    // console.log('artnet!!!',msg.v);

    // var uniChan=msg.id.split(",");
    var v=msg.v;

    try
    {
        if(v)
        {
    
            this.artnet.set( parseInt(msg.id),0, v,function()
            {
                // console.log('artnet msg send!',msg.id);
            });
        
        }
    
    }
    catch(e)
    {

    }

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