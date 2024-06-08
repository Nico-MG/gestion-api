export const deleteOrderService = async (req) => {
	try {
		const order = await getOrder(req.params.id);
		if (!order) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: null,
			};
		}
		const newOrder = await deleteOrder(req.params.id);
		return {
			status: 200,
			message: `orden eliminado, id: ${newOrder.id_producto}`,
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
