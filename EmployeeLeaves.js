class EmployeeLeaves {
	constructor() {}

	addData(data) {
		
		const name = data.emp_name;
		const totalLeaves = data.leaves ? data.leaves.length : 0;
		return {
			name,
			totalLeaves
		};

	}
}

module.exports.EmployeeLeaves = EmployeeLeaves;