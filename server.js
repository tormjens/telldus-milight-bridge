var express = require('express');
var app = express();

// milight
var Milight = require('node-milight-promise').MilightController;
var commands = require('node-milight-promise').commands;

var light = new Milight({
    ip: "192.168.1.108",
    delayBetweenCommands: 70,
    commandRepeat: 1
});

function sendCommand(type, zone) {
	if(type === 'on') {
		light.sendCommands(commands.white.on(zone), commands.white.maxBright(zone));
	} else if(type === 'off') {
		light.sendCommands(commands.white.off(zone));
	}
	light.pause(1000);
}
function setWarmth(level, zone) {
	for (var x = 0; x < level; x++) {
	    light.sendCommands(commands.white.warmer());
	    light.pause(100);
	}
}

app.get('/on/:zone', function(req, res) {
	sendCommand('on', req.params.zone);
	setWarmth(10, req.params.zone);
	res.send(true);
});

app.get('/off/:zone', function(req, res) {
	sendCommand('off', req.params.zone);
	res.send(true);
});

app.get('')

app.listen(3000, function () {
  console.log('Bridge listening on port 3000!');
});