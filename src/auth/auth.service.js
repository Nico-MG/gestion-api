import { getUser } from "./auth.model.js";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import "dotenv/config";
import bcrypt from "bcrypt";
import InvalidRut from "../core/errors/invalidRut.js";
import moduleRut from "../core/actions/module11.js";

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}


const getLoginUser = async (req, res) => {
	const SECRET_KEY = process.env.SECRET_KEY;
	const { rutu, pwd } = req.body;
      

	try {

              if(!rutu || !pwd){
		  throw new HttpError(401,"Campos vacíos");
                }


	    
               if(!moduleRut(rutu)){
         	     throw new InvalidRut(rutu);
 
                }

	    
               const result = await getUser(rutu);
	        
                if(!result){
		    throw new HttpError(401,"Usuario no existe");
       	       }

	    
	        const role = result.role;

		if (!result || !bcrypt.compareSync(pwd, result.password)) {
		    throw new HttpError(401,"Credenciales incorrectas");

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

		//res.setHeader("Set-Cookie", serialized);
	       return { status: 200, message:  "Bienvenido!", credentials : token };

	} catch (HttpError) {
            res.setHeader("Set-Cookie", "NULL");
	    return { status: HttpError.statusCode ? HttpError.statusCode : 500, message: HttpError.message , credentials : ""};
	}
};

export default getLoginUser;
