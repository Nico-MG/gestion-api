import { getSale } from "../sales.model";

export const deleteSaleService = async (req) => {
	try {
		const sale = await getSale(req.params.id);

		if (!sale) {
			return {
				status: 400,
				message: "Venta no existe",
				data: {},
			};
		}
	} catch (error) {
		console.error(error.message);
		return {
			status: 500,
			message: "Error interno del servidor",
			data: {},
		};
	}
};
