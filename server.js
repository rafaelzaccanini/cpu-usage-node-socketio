var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var os = require('os-utils');
 
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
 
setInterval(function(){
	os.cpuUsage(function(usage){
		 io.emit('cpu_usage', usage);	 
	 });
}, 1000);
 
http.listen(3500, function(){
  console.log('Listening on *:3500');
});