import { adapterToDBWithDetails, adapterToFrontWithDetails } from "../../core/actions/adapter";
import tables from "../../core/database/tableStructures.js"
export const createOrderService = async (req) => {
	try {
		const order = await getOrder(req.params.id);
		if (order) {
			return {
				status: 400,
				mesage: "producto ya existe",
				data: {},
			};
		}

		const {adaptedBody, adaptedDetails} = adapterToDBWithDetails(tables.orders, tables.orders_details, req.body)
		
		const newOrder = await createOrder(adaptedBody, adaptedDetails);
		const adaptedNewOrder = adapterToFrontWithDetails(tables.orders, tables.orders_details, newOrder)
		return {
			status: 200,
			message: `orden creado, id: ${adaptedNewOrder.ido}`,
			data: adaptedNewOrder,
		};
	} catch (error) {
		console.error(error.message)
		return {
			status: 500,
			message: "Error interno del servidor",
			data: {},
		};
	}
};
