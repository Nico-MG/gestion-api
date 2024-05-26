import {
	getAllRefunds,
	getRefund,
	deleteRefund,
	createRefund,
	updateRefund,
} from "./refund.model.js";

const getRefundService = async (id) => {
	return await getRefund(id);
};

const getAllRefundsService = async () => {
	return await getAllRefunds();
};

const updateRefundService = async (id, newId, idv, fecha, desc, dRefund) => {
	const dRefundData = dRefund.map((e) => {
		return {
			id_producto: e.id_producto,
			cantidad: e.cantidad,
		};
	});
	return await updateRefund(id, newId, idv, fecha, desc, dRefundData);
};

const deleteRefundService = async (id) => {
	return await deleteRefund(id);
};

const createRefundService = async (id, idv, fecha, desc, dRefund) => {
	const dRefundData = dRefund.map((e) => {
		return {
			id_producto: e.id_producto,
			cantidad: e.cantidad,
		};
	});
	return await createRefund(id, idv, fecha, desc, dRefundData);
};

export {
	getAllRefundsService,
	getRefundService,
	createRefundService,
	updateRefundService,
	deleteRefundService,
};
