let fs = require("fs")
let arrOfData = [];

function addDataToArray(data) {
	let empArr = data.split(' ');
	arrOfData.push({
		emp_name: empArr[0],
		leaves: empArr.slice(1)
	});
	console.log('line: '+data);
}

function readData(dataStream) {
	var remaining = '';
	
	dataStream.on('data',function(chunk){
		remaining += chunk;
		let index = remaining.indexOf('\n');
		while (index > -1) {
			let line = remaining.substring(0,index);
			remaining = remaining.substring(index+1);
			addDataToArray(line.trim());
			index = remaining.indexOf('\n');
		}
	});
	dataStream.on('end',() => {
		if(remaining.length>0) {
			addDataToArray(remaining);
		}
	})
}

function mapEmpLeaveData(empData) {
	return { name: empData.emp_name,
					totalLeaves: empData.leaves.length};
}
function convertArrToJson(arrOfData) {
	console.log(JSON.stringify(arrOfData));
}

let myReadStream = fs.createReadStream(__dirname+'/data.txt','utf8');


readData(myReadStream);

setTimeout(() => {
	// console.log(arrOfData.length);
	// for(i=0;i<arrOfData.length;i++) {
	// 	console.log(arrOfData[i]);}
	let empData = arrOfData.map(mapEmpLeaveData);
	convertArrToJson(empData);
}, 3000);

