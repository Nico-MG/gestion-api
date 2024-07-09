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
	getRefundSaleCode,
} from "./refunds.model.js";
import formattedDetails from "../core/actions/formattedDetails.js";
import filterHelper from "../core/actions/filterHelper.js";

export const getAllRefundsService = async (req) => {
	let content = await getAllRefunds();
	for (const refund of content) {
		refund.cods = (await getRefundSaleCode(refund.sale_id)).code
	}
	content = filterHelper(iRefund, content, req.query);
	content = content.map((refund) =>
		adapterToFrontWithDetails(iRefund, iRefundDetails, refund),
	);
	content = content.map((refund) => formattedDetails(refund));
	return content;
};

export const getRefundService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const refund = await getRefund(id);
	if (!refund) {
		throw new NotFound("Devolución");
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
		throw new CodeRepeat("devolución", req.body.cod);
	}
	const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
		iRefund,
		iRefundDetails,
		req.body,
	);
	await createRefund(adaptedBody, adaptedDetails);
	adaptedDetails.map(async (detail) => {
		await quantityAdjuster("SUM", "ADD", detail, {});
	});
};

export const updateRefundService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const refund = await getRefund(id);
	const refundCode = await getCodeRefund(req.body.cod);
	if (!refund) {
		throw new NotFound("Devolución");
	}
	if (refundCode.length > 1) {
		throw new CodeRepeat("devolución", req.body.cod);
	}

	const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
		iRefund,
		iRefundDetails,
		req.body,
	);
	await updateRefund(id, adaptedBody, adaptedDetails);
	adaptedDetails.map(async (detail) => {
		await quantityAdjuster(
			"SUM",
			"UPD",
			detail,
			refund.refund_details.filter(
				(elm) => elm.product_id === detail.product_id,
			)[0],
		);
	});
};

export const deleteRefundService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const refund = await getRefund(id);
	if (!refund) {
		throw new NotFound("Devoción");
	}

	await deleteRefund(id);
	refund.details.map(async (detail) => {
		await quantityAdjuster("SUM", "DEL", detail, {});
	});
};
