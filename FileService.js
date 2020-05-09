let fs = require("fs")

let arrOfData = [];

async function getEmployeeData(path) {
	arrOfData = [];
	return new Promise((resolve,reject) => {

			let dataStream = fs.createReadStream(path,'utf8');
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
				// console.log('At End'+arrOfData.length);
				// for(i=0;i<arrOfData.length;i++) {
				// 	console.log(arrOfData[i]);}
				resolve(arrOfData);
			});

			dataStream.on('error',(err) => {
				// console.log('Error Occured.... ');
				reject(err);
			});
		});
}

function addDataToArray(data) {
	let empArr = data.split(' ');
	arrOfData.push({
		emp_name: empArr[0],
		leaves: empArr.slice(1)
	});
	//console.log(`line: ${arrOfData.length} `+data);
}

module.exports.getEmployeeData = getEmployeeData
