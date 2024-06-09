import tables from "../database/tableStructures.js";
import { adapterToDB } from "../actions/adapter.js";

const regular_expression = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const validatorData = (req, res, next) => {
	const direc = req.originalUrl.split("/")[1];
	const dataTable = tables[direc];

	const dbProductData = adapterToDB(dataTable, req.body);

	for (const key in dataTable) {
		const attribute = dataTable[key][0];
		const type = dataTable[key][1];

		const value = dbProductData[attribute];

		if (regular_expression.test(value) || typeof value !== type) {
			return res.status(400).send("Invalid data");
		}
	}

	next();
};

export default validatorData;
