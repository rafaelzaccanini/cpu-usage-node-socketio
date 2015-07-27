var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http); //, {'transports': ['websocket', 'xhr-polling']});
var cpu = require('./cpu.js');
var interval = 1000;
var port = process.env.PORT || 80;
var connectCounter = 0;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
 
setInterval(function(){
	 cpu.getPercentageUsage(interval, function(percentage){
	 	io.emit('cpu_usage', percentage);
	 });
}, interval);
 
io.on('connect', function() { 
	connectCounter++;
	
	io.emit('test', connectCounter);
	
	if(connectCounter == 7)
	 	io.disconnect();
});
 
http.listen(port, function(){
  console.log('Listening');
});