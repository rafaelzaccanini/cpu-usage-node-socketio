var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cpu = require('./cpu.js');
var interval = 1000;

io.configure(function () {
   io.set('transports', ['websocket','xhr-polling'])
});
 
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
 
setInterval(function(){
	io.emit('cpu_usage', '500');
	// cpu.getPercentageUsage(interval, function(percentage){
	// 	io.emit('cpu_usage', percentage);
	// });
}, interval);
 
http.listen(3500, function(){
  console.log('Listening on *:3500');
});