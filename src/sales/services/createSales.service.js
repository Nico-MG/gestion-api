import { adapterToDBWithDetails } from "../../core/actions/adapter";
import { iSales, iSalesDetails } from "../../core/database/tableStructures";
import { createPurchase, getPurchase } from "../../purchases/purchases.model";

export const createSaleService = async (req) => {
	try {
		const sales = await getPurchase(req.body.ids);
		if (sales) {
			return {
				status: 400,
				message: "Venta ya existe",
				data: {},
			};
		}

		const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
			iSales,
			iSalesDetails,
			req.body,
		);
		await createPurchase(adaptedBody, adaptedDetails);

		return {
			status: 200,
			message: `Venta realizada, id: ${req.body.ids}`,
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
