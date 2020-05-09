let fileService = require('./FileService');
let employeeLeaves = require('./EmployeeLeaves');

let path = __dirname + '/data.txt';

async function readEmployeeLeavesData() {
	try {
		const empData = await fileService.getEmployeeData(path);
		
		// empData.forEach(element => {
		// 	console.log(element);
		// });
		let empLeaveData = empData.map((emp) => {
				// return { name: emp.emp_name,
				// totalLeaves: emp.leaves.length};
				return new employeeLeaves.EmployeeLeaves().addData(emp);
		}).sort((firstEmp,secondEmp) => firstEmp.name>secondEmp.name ? 1: -1);
		// empLeaveData.forEach(element => {
		// 	console.log(element);
		// });
		
		return empLeaveData;
	}
	catch (err) {
		console.log('Error Catched ' + err);
	}
}

module.exports.readEmployeeLeavesData = readEmployeeLeavesData;

//readEmployeeLeavesData()