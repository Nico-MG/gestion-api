import { getUser } from "./auth.model.js";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import "dotenv/config";



const getLoginUser = async (req) => {	
    const SECRET_KEY = process.env.SECRET_KEY;
    const { rutu , pwd } = req.body;

    if(!rutu || !pwd){
	return { status : 401 };	
    }

    const result = await getUser(rutu);


    if(!result){
	return { status : 401 };
    }


    if( pwd == result.password ){

	const token = jwt.sign({ rutu }, SECRET_KEY, { expiresIn: "1h" }    );


	const serialized = cookie.serialize("my-token", token, {
		httpOnly: true,
		sameSite: "strict",
		maxAge: 1000 * 60 * 60,
		path: "/",
	});

	return {  cookie : serialized , status : 200 };
    
	
    } else {
	
	return { status : 401 }
	
    }
    
};


export default getLoginUser;
