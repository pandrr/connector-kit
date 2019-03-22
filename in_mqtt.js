var colors = require('colors/safe');
const internalIp = require('internal-ip');
var Message = require("./message").Message;
var mqttServer = require('mqtt-server');

var InMQTT=function(output)
{

    this.port=1883;
    this._servers=mqttServer({
        mqtt: 'tcp://localhost:'+this.port,
      //  mqtts: 'ssl://localhost:8883',
      //  mqttws: 'ws://localhost:1884',
      //  mqtwss: 'wss://localhost:8884'
      }, {
      //  ssl: {
       //   key: fs.readFileSync('./server.key'),
        //  cert: fs.readFileSync('./server.crt')
        //},
        emitEvents: true // default
      }, function(client)
      {
        console.log(colors.yellow("[mqtt] client connected!"));
      
        client.on('data', function(d)
        {
            if(d.topic)
            {
                var pl=d.payload.toString('utf8');
                var type="s";
                if(!isNaN(pl))
                {
                    pl=parseFloat(pl);
                    type="f";
                }
                
               
                output.send(new Message('mqtt/'+d.topic,type,pl));
            }
        });
      
        client.connack({
            returnCode: 0
        });
        
      
    });
       
    this._servers.listen(function(){
        console.log(colors.cyan("[mqtt] server started port "+this.port));
    }.bind(this));
      


}

module.exports.InMQTT=InMQTT;
