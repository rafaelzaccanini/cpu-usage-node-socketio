var app = require('express')();
// app.use(function(req, res, next) {
//         res.header("Access-Control-Allow-Origin", "*");
//         res.header("Access-Control-Allow-Headers", "X-Requested-With");
//         res.header("Access-Control-Allow-Headers", "Content-Type");
//         res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
//         next();
//     });
	
var http = require('http').Server(app);
var io = require('socket.io')(http); //, {'transports': ['websocket', 'xhr-polling']});
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