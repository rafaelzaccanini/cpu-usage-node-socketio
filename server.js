var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {'transports': ['websocket', 'polling']});
var cpu = require('./cpu.js');
var interval = 1000;
var port = process.env.PORT || 80;

// io.on('connection', function () {
//   io.set('transports', [ 'websocket', 'xhr-polling' ]);  
// });

// io.set('transports', [ 'xhr-polling', 'websocket' ]); 

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
 
setInterval(function(){
	 cpu.getPercentageUsage(interval, function(percentage){
	 	io.emit('cpu_usage', percentage);
	 });
}, interval);
 
http.listen(port, function(){
  console.log('Listening');
});