var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var cpu = require('./cpu.js');
var interval = 1000;
var port = 3500;

// io.configure(function () {
//    io.set('transports', ['websocket','xhr-polling'])
// });
 
// app.get('/', function(req, res){
// 	res.sendFile(__dirname + '/index.html');
// });
 
setInterval(function(){
	io.emit('cpu_usage', '500');
	// cpu.getPercentageUsage(interval, function(percentage){
	// 	io.emit('cpu_usage', percentage);
	// });
}, interval);
 
// http.listen(port, function(){
//   console.log('Listening on *:3500');
// });

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.sendFile(__dirname + '/index.html');
}).listen(port);