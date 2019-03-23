var colors = require('colors/safe');
var gamepad = require("gamepad");
var Message = require("./message").Message;

var InGamepad=function(output)
{
    console.log(colors.cyan("starting input gamepad"));
    gamepad.init()

    for (var i = 0, l = gamepad.numDevices(); i < l; i++)
    {
        console.log(colors.yellow('[gamepad] connected: '+i+' '+gamepad.deviceAtIndex().description+''));
    }

    gamepad.on("down", function (id, num) {
        output.send(new Message('gamepad/'+id+'/button/'+num,'f',1));
    });
    gamepad.on("up", function (id, num) {
        output.send(new Message('gamepad/'+id+'/button/'+num,'f',0));
    });

    gamepad.on("move", function (id, axis, value) {

        output.send(new Message('gamepad/'+id+'/axis/'+axis,'f',value));
        
        // console.log("move", {
        //   id: id,
        //   axis: axis,
        //   value: value,
        // });
      });

      
    setInterval(gamepad.processEvents, 16);
}

module.exports.InGamepad=InGamepad;