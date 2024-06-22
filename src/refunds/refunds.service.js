import NotFound from "../core/errors/notFound.js";
import CodeRepeat from "../core/errors/codeRepeat.js";
import { iRefund, iRefundDetails } from "../core/database/tableStructures.js";
import {
	adapterToDBWithDetails,
	adapterToFrontWithDetails,
} from "../core/actions/adapter.js";
import {
	getAllRefunds,
	getRefund,
	getCodeRefund,
	deleteRefund,
	createRefund,
	updateRefund,
	getRefundsCount,
} from "./refunds.model.js";
import formattedDetails from "../core/actions/formattedDetails.js";
import filterHelper from "../core/actions/filterHelper.js";

export const getAllRefundsService = async (req) => {
	const query = {
		dato: iRefund[req.query.dato] || "refund_id",
		orden: req.query.orden || "asc",
		limit: Number.parseInt(req.query.limit) || 10,
		offset: Number.parseInt(req.query.offset) || 0,
		desde: req.query.desde || "2000-01-01",
		hasta: req.query.hasta || "2099-12-31",
		numero: Number.parseInt(req.query.numero) || 0,
		texto: req.query.texto || "",
	};

	const allRefund = await getAllRefunds(query);

	const adaptedRefund = allRefund.map((refund) =>
		adapterToFrontWithDetails(iRefund, iRefundDetails, refund),
	);

	const formattedRefund = formattedDetails(adaptedRefund);
	return filterHelper(iRefund, formattedRefund, query);
};

export const getRefundService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const refund = await getRefund(id);
	if (!refund) {
		throw new NotFound("Devolucion");
	}

	const adaptedRefund = adapterToFrontWithDetails(
		iRefund,
		iRefundDetails,
		refund,
	);
	return adaptedRefund;
};

export const getRefundsCountService = async () => {
	return await getRefundsCount();
};

export const createRefundService = async (req) => {
	const refund = await getCodeRefund(req.body.cod);
	if (refund === 1) {
		throw new CodeRepeat("devolucion", req.body.cod);
	}
	const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
		iRefund,
		iRefundDetails,
		req.body,
	);
	await createRefund(adaptedBody, adaptedDetails);
};

export const updateRefundService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const refund = await getRefund(id);
	const refundCode = await getCodeRefund(req.body.cod);
	if (!refund) {
		throw new NotFound("Devolucion");
	}
	if (refundCode.length > 1) {
		throw new CodeRepeat("devolucion", req.body.cod);
	}

	const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
		iRefund,
		iRefundDetails,
		req.body,
	);
	await updateRefund(id, adaptedBody, adaptedDetails);
};

export const deleteRefundService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const refund = await getRefund(id);
	if (!refund) {
		throw new NotFound("Devolcion");
	}

	await deleteRefund(id);
};
