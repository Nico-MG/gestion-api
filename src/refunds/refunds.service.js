import NotFound from "../core/errors/notFound.js";
import CodeRepeat from "../core/errors/codeRepeat.js";
import MinimumQuantity from "../core/errors/minimumQuantity.js";
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
	getRefundSalesProductCit,
	getAllRefundsCodes,
} from "./refunds.model.js";
import { getProductService } from "../products/products.service.js";
import formatRefund from "../core/actions/formatRefund.js";
import filterHelper from "../core/actions/filterHelper.js";
import quantityAdjuster from "../core/actions/quantityAdjuster.js";

export const getAllRefundsService = async (req) => {
	let content = await getAllRefunds();
	content = await Promise.all(
		content.map(async (refund) => {
			refund.refund_details = await Promise.all(
				refund.refund_details.map(async (detail) => {
					const obj = await getRefundSalesProductCit(
						refund.sale_id,
						detail.product_id,
					);
					const sale_quantity = obj?.quantity || 0;
					return { ...detail, sale_quantity };
				}),
			);
			return refund;
		}),
	);
	content = content.map((refund) => formatRefund(refund));
	const { result, largo } = filterHelper(iRefund, content, req.query);
	content = result.map((refund) =>
		adapterToFrontWithDetails(iRefund, iRefundDetails, refund),
	);

	return { content, largo };
};

export const getRefundService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const refund = await getRefund(id);
	if (!refund) {
		throw new NotFound("Devolución");
	}

	refund.refund_details = await Promise.all(
		refund.refund_details.map(async (detail) => {
			const obj = await getRefundSalesProductCit(
				refund.sale_id,
				detail.product_id,
			);
			const sale_quantity = obj?.quantity || 0;
			return { ...detail, sale_quantity };
		}),
	);

	const adaptedRefund = adapterToFrontWithDetails(
		iRefund,
		iRefundDetails,
		formatRefund(refund),
	);

	return adaptedRefund;
};

export const getRefundsCountService = async () => {
	return await getRefundsCount();
};

export const getAllRefundsCodesService = async () => {
	const codes = await getAllRefundsCodes();
	return codes.map((code) => code.code);
};

export const createRefundService = async (req) => {
	const refund = await getCodeRefund(req.body.codr);
	if (refund.length > 0) {
		throw new CodeRepeat("devolución", req.body.codr);
	}
	const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
		iRefund,
		iRefundDetails,
		req.body,
	);

	const detallesValidos = adaptedDetails.map(async (detail) => {
		await quantityAdjuster("SUM", "ADD", detail, {});
	});
	await createRefund(adaptedBody, detallesValidos);
};

export const updateRefundService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const refund = await getRefund(id);
	const refundCode = await getCodeRefund(req.body.codr);
	if (!refund) {
		throw new NotFound("Devolución");
	}
	if (refundCode.length > 0 && refundCode[0].refund_id !== id) {
		throw new CodeRepeat("devolución", req.body.codr);
	}

	const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
		iRefund,
		iRefundDetails,
		req.body,
	);

	const detallesValidos = adaptedDetails.map(async (detail) => {
		await quantityAdjuster(
			"SUM",
			"UPD",
			detail,
			refund.refund_details.filter(
				(elm) => elm.product_id === detail.product_id,
			)[0],
		);
	});
	await updateRefund(id, adaptedBody, detallesValidos);
};

export const deleteRefundService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const refund = await getRefund(id);
	if (!refund) {
		throw new NotFound("Devoción");
	}
	for (const detail of refund.details) {
		const product = await getProductService({
			params: { id: detail.product_id },
		});
		if (product.cit - detail.quantity < 0) {
			throw new MinimumQuantity(product.cod, product.nombre);
		}
	}

	refund.details.map(async (detail) => {
		await quantityAdjuster("SUM", "DEL", detail, {});
	});
	await deleteRefund(id);
};
