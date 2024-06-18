import { adapterToFrontWithDetails } from "../../core/actions/adapter.js";
import { getAllPurchases, getPurchase } from "../purchases.model.js";
import {
	iPurchase,
	iPurchaseDetails,
} from "../../core/database/tableStructures.js";

export const getPurchaseService = async (req) => {
	try {
		const purchase = await getPurchase(req.params.id);
		if (!purchase) {
			return {
				status: 400,
				message: "Compra no existe",
				data: {},
			};
		}

		const adaptedPurchase = adapterToFrontWithDetails(
			iPurchase,
			iPurchaseDetails,
			purchase,
		);

		return {
			status: 200,
			message: `Compra encontrada, id: ${adaptedPurchase.idpu}`,
			data: purchase,
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
		const purchases = await getAllPurchases(req.query);
		if (purchases.length === 0) {
			return {
				status: 200,
				message: "Compras no existen",
				data: [],
			};
		}

		const adaptedPurchases = purchases.map((purchase) =>
			adapterToFrontWithDetails(iPurchase, iPurchaseDetails, purchase),
		);

		return {
			status: 200,
			message: `Se encontraron compras, Cantidad: ${adaptedPurchases.length}`,
			data: purchases,
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
