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
		const newOrder = await updateOrder(req.params.id, req.body);
		return {
			status: 200,
			message: `orden actualizado, id: ${newOrder.id_producto}`,
			data: newOrder,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};
