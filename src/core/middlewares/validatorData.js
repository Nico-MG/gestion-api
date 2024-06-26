const regular_expression = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const rut_regex = /\b\d{8}-\d\b/;
const email_regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const fecha_regex = /^\d{4}-\d{2}-\d{2}$/;

const validatorData = (req, res, next) => {
	const data = req.body;

	for (const key in data) {
		if (key === "fecha") {
			if (!fecha_regex.test(data[key])) {
				return res.status(400).json({ message: "Fecha invalida" });
			}
			continue;
		}

		if (key === "email") {
			if (!email_regex.test(data[key])) {
				return res.status(400).json({ message: "Correo invalido" });
			}
			continue;
		}

		if (key.substring(0, 3) === "rut") {
			if (!rut_regex.test(data[key])) {
				return res.status(400).json({ message: "Rut inválidos" });
			}
			continue;
		}

		if (typeof data[key] === "object") {
			for (const product in data[key]) {
				for (const field in data[key][product]) {
					if (regular_expression.test(data[key][product][field])) {
						return res.status(400).json({ message: "Caracteres inválidos" });
					}
				}
			}
			continue;
		}

		if (regular_expression.test(data[key])) {
			return res.status(400).json({ message: "Caracteres inválidos" });
		}
	}

	next();
};

export default validatorData;
