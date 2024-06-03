import tableStructure from "../actions/tableStructures.js";
const regular_expression = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const validatorData = (req, res, next) => {
	const direc = req.originalUrl.replace("/", "");

	for (const key in req.body) {
		const value = req.body[key];
		const structure_type = tableStructure[direc][key];

		if (!structure_type) {
			res.status(400).send(`${key} attribute invalid`);
		}

		if (regular_expression.test(value) || typeof value !== structure_type) {
			return res.status(400).send("Invalid data");
		}
	}

	next();
};

export default validatorData;
