import jwt from "jsonwebtoken";

const validateLog = (credentials, result) => {
	const user = credentials.rut;
	const password = credentials.password;

	if (!user || !password) {
		return { message: "Vacio" };
	}
	if (user !== result.rut_usuario || password !== result.contrasena) {
		return { message: "Auth failed" };
	}

	const token = jwt.sign({ user }, password, { expiresIn: "1h" });
	const serialized = cookie.serialize("my-token", token, {
		httpOnly: true,
		sameSite: "strict",
		maxAge: 1000 * 60 * 60,
		path: "/",
	});

	return { serialized };
};

export default validateLog;
