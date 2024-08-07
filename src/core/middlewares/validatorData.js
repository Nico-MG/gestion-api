const regular_expression = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const rut_regex = /\b\d{1,2}\.\d{3}\.\d{3}\-(\d|(K|k))\b/;
const email_regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const fecha_regex = /^\d{4}-\d{2}-\d{2}$/;
const timestamp_regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

const validatorData = (req, res, next) => {
	const data = req.body;

	for (const key in data) {
		if (key === "creado") {
			// un regex que valida si es un timestamp
			if (!timestamp_regex.test(data[key])) {
				return res.status(400).json({ message: "Fecha invalida" });
			}
			continue;
		}
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
			return res.status(400).json({ message: `Objeto inválido: ${data[key]}` });
		}
	}

	next();
};

export default validatorData;
