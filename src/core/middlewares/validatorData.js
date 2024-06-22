const regular_expression = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const rut_regex = /\b\d{8}-\d\b/;
const email_regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const fecha_regex = /^\d{4}-\d{2}-\d{2}$/;

const validatorData = (req, res, next) => {
	const data = req.body;

	for (const key in data) {
		if (key === "fecha") {
			if (!fecha_regex.test(data[key])) {
				return res.sendStatus(400);
			}
			continue;
		}

		if (key === "email") {
			if (!email_regex.test(data[key])) {
				return res.sendStatus(400);
			}
			continue;
		}

		if (key.substring(0, 3) === "rut") {
			if (!rut_regex.test(data[key])) {
				return res.sendStatus(400);
			}
			continue;
		}

		if (typeof data[key] === "object") {
			for (const product in data[key]) {
				// detalle -> [json, json ]
				for (const field in data[key][product]) {
					if (regular_expression.test(data[key][product][field])) {
						return res.sendStatus(400);
					}
				}
			}
			continue;
		}

		if (regular_expression.test(data[key])) {
			return res.sendStatus(400);
		}
	}

	next();
};

export default validatorData;
