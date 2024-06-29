import { getUser } from "./auth.model.js";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import "dotenv/config";
import bcrypt from "bcrypt";
import InvalidRut from "../core/errors/invalidRut.js";
import moduleRut from "../core/actions/module11.js";

const getLoginUser = async (req, res) => {
	const SECRET_KEY = process.env.SECRET_KEY;
	const { rutu, pwd } = req.body;
      

    
	if (!rutu || !pwd) {
		return { status: 401, message: "Campos vacíos" };
	}

	try {

               if(!moduleRut(rutu)){
         	     throw new InvalidRut(rutu);
 
                }

	    
	        const result = await getUser(rutu);
		const role = result.role;

		if (!result || !bcrypt.compareSync(pwd, result.password)) {
			return { status: 401, message: "Credenciales incorrectas" };
		}

		const token = jwt.sign({ role }, SECRET_KEY, { expiresIn: "1h" });
		const serialized = cookie.serialize("my-token", token, {
			httpOnly: true,
      		        sameSite: 'None',
		        secure: true,
			maxAge: 1000 * 60 * 60,
		        path: '/',
		        partition : 'By-Site'
		});

		res.setHeader("Set-Cookie", serialized);
	        
	        return { status: 200, message: token };
	} catch {
		return { status: 500, message: "Error interno del servidor" };
	}
};

export default getLoginUser;
