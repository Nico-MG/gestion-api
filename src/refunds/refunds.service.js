import {
	getAllRefunds,
	getRefund,
	deleteRefund,
	createRefund,
	updateRefund,
} from "./refunds.model.js";

const createRefundService = async (req) => {
	try {
		const refund = await getRefund(req.body.id_producto);
		if (refund) {
			return {
				status: 400,
				message: "Producto existe",
				data: refund,
			};
		}
		const newRefund = await createRefund(req.body);
		return {
			status: 200,
			message: `Producto creado, id: ${newRefund.id_producto}`,
			data: newRefund,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const deleteRefundService = async (req) => {
	try {
		const refund = await getRefund(req.params.id);
		if (!product) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: null,
			};
		}
		const newRefund = await deleteRefund(req.params.id);
		return {
			status: 200,
			message: `producto eliminado, id: ${newRefund.id_producto}`,
			data: newRefund,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const updateRefundService = async (req) => {
	try {
		const refund = await getRefund(req.params.id);
		if (!refund) {
			return {
				status: 400,
				mesage: "producto no existe",
				data: null,
			};
		}
		const newRefund = await updateRefund(req.params.id, req.body);
		return {
			status: 200,
			message: `producto actualizado, id: ${newRefund.id_producto}`,
			data: newRefund,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const getRefundService = async (req) => {
	try {
		const refund = await getRefund(req.params.id);
		if (!refund) {
			return {
				status: 400,
				message: "No se encontro el producto",
				data: null,
			};
		}
		return {
			status: 200,
			message: "Se encontro el producto",
			data: refund,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

const getAllRefundsService = async (req) => {
	try {
		const allRefunds = await getAllRefunds();
		if (allRefunds.length === 0) {
			return {
				status: 400,
				message: "No se encontraron devoluciones",
				data: null,
			};
		}
		return {
			status: 200,
			message: "Se encontraron devoluciones",
			data: allRefunds,
		};
	} catch (error) {
		return {
			status: 500,
			message: `Error interno del servidor: ${error.message}`,
			data: null,
		};
	}
};

export {
	getAllRefundsService,
	getRefundService,
	createRefundService,
	updateRefundService,
	deleteRefundService,
};
