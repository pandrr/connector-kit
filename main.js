"use strict"

var InGamepad = require("./in_gamepad").InGamepad;
var InMQTT = require("./in_mqtt").InMQTT;
var InOSC = require("./in_osc").InOSC;
var InWS = require("./in_ws").InWS;
var OutArtNet = require("./out_artnet").OutArtNet;
var OutWebSocket = require("./out_ws").OutWebSocket;
const internalIp = require('internal-ip');
var colors = require('colors/safe');


// --------------------------------------

var OutputManager=function()
{
    this._outputs=[];
}

OutputManager.prototype.add=function(o)
{
    this._outputs.push(o);
}

OutputManager.prototype.send=function(msg)
{
    console.log('[send]',msg.id,':',msg.v);

    for(var i=0;i<this._outputs.length;i++)
    {
        this._outputs[i].send(msg);
    }
}

// --------------------------------------

console.log(colors.underline.cyan("local ip:",internalIp.v4.sync()));

const output=new OutputManager();
const outWs=new OutWebSocket();
outWs.start();
output.add(outWs);

const outArtnet=new OutArtNet();
outArtnet.start();
output.add(outArtnet);


// --------------------------------------

const osc=new InOSC(output);
const ws=new InWS(output);
const mqtt=new InMQTT(output);
const gamepad=new InGamepad(output);

