import { adapterToFrontWithDetails } from "../../core/actions/adapter.js";
import { getAllPurchases, getPurchase } from "../purchases.model.js";
import { iPurchase, iPurchaseDetails } from "../../core/database/tableStructures.js";

export const getPurchaseService = async (req) => {
	try {
		const order = await getPurchase(req.params.id);
		if (!order) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: {},
			};
		}

		const adaptedOrder = adapterToFrontWithDetails(
			iPurchase,
			iPurchaseDetails,
			order,
		);

		return {
			status: 200,
			message: `orden encontado, id: ${adaptedOrder.ido}`,
			data: order,
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

export const getAllPurchasesService = async (req) => {
	try {
		const orders = await getAllPurchases(req.query);
		if (orders.length === 0) {
			return {
				status: 200,
				message: "Compras no existen",
				data: [],
			};
		}

		const adaptedOrders = orders.map((order) =>
			adapterToFrontWithDetails(iPurchase, iPurchaseDetails, order),
		);

		return {
			status: 200,
			message: `Se encontraron ordenes, Cantidad: ${adaptedOrders.length}`,
			data: adaptedOrders,
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
