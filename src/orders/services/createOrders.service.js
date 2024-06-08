export const createOrderService = async (req) => {
	try {
		const order = await getOrder(req.params.id);
		if (order) {
			return {
				status: 400,
				mesage: "producto ya existe",
				data: order,
			};
		}
		const newOrder = await createOrder(req.body);
		return {
			status: 200,
			message: `orden creado, id: ${newOrder.id_producto}`,
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
