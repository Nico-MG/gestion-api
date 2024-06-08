import { adapterToDBWithDetails, adapterToFrontWithDetails } from "../../core/actions/adapter";
import tables from "../../core/database/tableStructures";

export const updateOrderService = async (req) => {
	try {
		const order = await getOrder(req.params.id);
		if (!order) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: null,
			};
		}
		const {adaptedBody, adaptedDetails} = adapterToDBWithDetails(tables.orders, tables.orders_details, order)
		const newOrder = await updateOrder(req.params.id, adaptedBody, adaptedDetails);
		const adaptedNewOrder = adapterToFrontWithDetails(tables.orders, tables.orders_details, newOrder)
		return {
			status: 200,
			message: `orden actualizado, id: ${adaptedNewOrder.ido}`,
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
