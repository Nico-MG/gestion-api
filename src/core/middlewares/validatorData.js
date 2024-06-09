const regular_expression = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const validatorData = (req, res, next) => {
	const data = req.body;

	for (const key in data) {
		if (regular_expression.test(data[key])) {
			res.status(400);
		}
	}

	next();
};

export default validatorData;
