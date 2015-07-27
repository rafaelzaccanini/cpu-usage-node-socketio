var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http); //, {'transports': ['websocket', 'xhr-polling']});
var cpu = require('./cpu.js');
var interval = 1000;
var port = process.env.PORT || 80; //3500 to localhost

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
 
setInterval(function(){
	 cpu.getPercentageUsage(interval, function(percentage){
	 	io.emit('cpu_usage', percentage);
	 });
}, interval);
 
http.listen(port, function(){
  console.log('Listening on port :' + port);
});