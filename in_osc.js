var colors = require('colors/safe');
const osc=require("osc");
const internalIp = require('internal-ip');
var Message = require("./message").Message;

var InOSC=function(output)
{

    this.port=9000;

    console.log(colors.cyan("starting input osc on port "+this.port));

    this._udpPort = new osc.UDPPort({
        localAddress: internalIp.v4.sync(),//"192.168.1.169",
        localPort: this.port,
        metadata: true
    });
    
    this._udpPort.on("error", function (error) { /* do not remove this */});
    this._udpPort.open();
    
    this._udpPort.on("message", function (oscMsg)
    {
        for(var i=0;i<oscMsg.args.length;i++)
        {
            output.send(new Message('osc'+oscMsg.address,'f',oscMsg.args[i].value));
        }
    });
    

}

module.exports.InOSC=InOSC;
