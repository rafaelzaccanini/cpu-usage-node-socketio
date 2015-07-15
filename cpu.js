var os = require("os");
 
exports.getPercentageUsage = function(interval, callback){ 
    getPercentageUsage(callback, interval);
}
 
function getPercentageUsage(callback, interval){ 
    var start = cpuAverage();
	
    setTimeout(function() {
        var end = cpuAverage(); 
		var idleDif = end.idle - start.idle;
		var totalDif = end.total - start.total;

        callback(100 - (100 * idleDif/totalDif));	
    }, interval);
}
 
function cpuAverage() {
    var totalIdle = 0, totalTick = 0;
    var cpus = os.cpus();
 
	for(var i in cpus){
		var cpu = cpus[i];

		for(t in cpu.times)
			totalTick += cpu.times[t];
		
		totalIdle += cpu.times.idle;       
    }

	return {idle: totalIdle/cpus.length,  total: totalTick/cpus.length};
}