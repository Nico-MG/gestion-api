import { getProvider , createProvider } from "../providers.model.js";
import { adapterToDB , adapterToFront } from "../../core/actions/adapter.js";

import { iProvider } from "../../core/database/tableStructures.js";

export const createProviderService = async (req) => {
  
    try {

	const provider = await getProvider(req.body.rutp);
			
	if( provider ) {
	    return {
		status  :  400,
		message : "Proveedor ya existe",
		data    : {},
	    };
	}

	const dbProviderData = adapterToDB(iProvider, req.body);
	const createdProvider = await createProvider(dbProviderData)
	const newProvider = adapterToFront(iProvider, createdProvider);


	return {
		status: 200,
		message: "Proveedor añadido",
		data: newProvider,
	};
	
    } catch (error)  {
	return {
		status: 500,
		message: `Error interno del servidor: ${error.message}`,
		data: {},
		};
	
    }


};
