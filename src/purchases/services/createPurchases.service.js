import {
	adapterToDBWithDetails,
	adapterToFrontWithDetails,
} from "../../core/actions/adapter.js";
import { getPurchase, createPurchase } from "../purchases.model.js";
import {
	iPurchase,
	iPurchaseDetails,
} from "../../core/database/tableStructures.js";

// {

// 	"idpu" : "1234",
// 	"rutp": "1342",
// 	"rutu": "123532",
// 	"fecha": "2023-06-12T14:30:00.123456Z",
// 	"total": 3214,
//   "details": [
//     {
//       "idp": "98989",
//       "cit":2,
//       "precio": 50,
//       "suma":100
//     }

//     ]
// }

export const createPurchaseService = async (req) => {
	try {
		const purchase = await getPurchase(req.body.idpu);
		if (purchase) {
			return {
				status: 400,
				mesage: "Compra ya existe",
				data: purchase,
			};
		}

		const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
			iPurchase,
			iPurchaseDetails,
			req.body,
		);

		const newPurchase = await createPurchase(adaptedBody, adaptedDetails);
		return {
			status: 200,
		        message: `Compra creada, id: ${req.body.idpu}`,
			// message : 'Pedido creado',
		        data: {},
		};
	} catch (error) {
		console.error(error.message);
		return {
			status: 500,
			message: "Error interno del servidor",
			data: {},
		};
	}
};
