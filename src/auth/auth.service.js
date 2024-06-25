import { getUser } from "./auth.model.js";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import "dotenv/config";
import bcrypt from "bcrypt";

const getLoginUser = async (req, res) => {
	const SECRET_KEY = process.env.SECRET_KEY;
	const { rutu, pwd } = req.body;

	if (!rutu || !pwd) {
	    return { status: 401 , message : "Campos vacíos"};
	}

	try {
	    const result = await getUser(rutu);
	    const role = result.role;

	    if (!result || !bcrypt.compareSync(pwd, result.password)) {
		return { status: 401, message: "Credenciales incorrectas" };
		}

	    const token = jwt.sign({ role }, SECRET_KEY, { expiresIn: "1h" });
	    const serialized = cookie.serialize("my-token", token, {
			httpOnly: true,
			sameSite: "strict",
			maxAge: 1000 * 60 * 60,
			path: "/",
		});

	    res.setHeader("Set-Cookie", serialized);
            return { status: 200 , message: "Bienvenido!"};
	} catch {
	    return { status: 500, message : "Error interno del servidor" };
	}
};

export default getLoginUser;
