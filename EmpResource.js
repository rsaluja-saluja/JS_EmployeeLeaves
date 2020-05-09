var leaveController = require('./LeaveController');
var express = require('express');
var app = express();

app.get('/', function(req,res) {
	res.send('Home Page');
});

app.get('/empLeaves', async function(req,res) {
	const empLeaveData = await leaveController.readEmployeeLeavesData();
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end(JSON.stringify(empLeaveData));
});

app.listen(3000);
console.log("Server listening on 3000....");

	