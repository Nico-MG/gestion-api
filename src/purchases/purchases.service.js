import NotFound from "../core/errors/notFound.js";
import CodeRepeat from "../core/errors/codeRepeat.js";
import {
	iPurchase,
	iPurchaseDetails,
	iProduct,
	iProvider,
} from "../core/database/tableStructures.js";
import {
	adapterToFront,
	adapterToDBWithDetails,
	adapterToFrontWithDetails,
} from "../core/actions/adapter.js";
import {
	getAllPurchases,
	getPurchase,
	getCodePurchase,
	createPurchase,
	updatePurchase,
	deletePurchase,
	getPurchasesCount,
	getProductsAndProviders,
	getAllPurchasesCodes,
} from "./purchases.model.js";
import filterHelper from "../core/actions/filterHelper.js";
import formattedDetails from "../core/actions/formattedDetails.js";
import quantityAdjuster from "../core/actions/quantityAdjuster.js";

export const getAllPurchasesService = async (req) => {
	let content = await getAllPurchases();
	content = filterHelper(iPurchase, content, req.query);
	content = content.map((purchase) =>
		adapterToFrontWithDetails(iPurchase, iPurchaseDetails, purchase),
	);
	content = content.map((purchase) => formattedDetails(purchase));
	return content;
};

export const getPurchaseService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const purchase = await getPurchase(id);
	if (!purchase) {
		throw new NotFound("Compra");
	}

	const adaptedPurchase = adapterToFrontWithDetails(
		iPurchase,
		iPurchaseDetails,
		purchase,
	);
	return adaptedPurchase;
};

export const getPurchasesCountService = async () => {
	return await getPurchasesCount();
};

export const getProductsAndProvidersService = async () => {
	const data = await getProductsAndProviders();
	const products = data.products.map((product) =>
		adapterToFront(iProduct, product),
	);
	const providers = data.providers.map((provider) =>
		adapterToFront(iProvider, provider),
	);
	return { products, providers };
};

export const getAllPurchasesCodesService = async () => {
	const codes = await getAllPurchasesCodes();
	return codes.map((code) => code.code);
};

export const createPurchaseService = async (req) => {
	const purchase = await getCodePurchase(req.body.cod);
	if (purchase.length > 0) {
		throw new CodeRepeat("compra", req.body.cod);
	}

	const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
		iPurchase,
		iPurchaseDetails,
		req.body,
	);

	await createPurchase(adaptedBody, adaptedDetails);
	adaptedDetails.map(
		async (detail) =>
			await quantityAdjuster("SUM", "ADD", detail, {}),
	);
};

export const updatePurchaseService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const purchase = await getPurchase(id);
	const purchaseCode = await getCodePurchase(req.body.cod);
	if (!purchase) {
		throw new NotFound("Compra");
	}
	if (purchaseCode.length > 0 && purchaseCode[0].purchase_id !== id) {
		throw new CodeRepeat("compra", req.body.cod);
	}

	const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
		iPurchase,
		iPurchaseDetails,
		req.body,
	);
	//await priceAdjuster(adaptedDetails);
	await updatePurchase(id, adaptedBody, adaptedDetails);
	adaptedDetails.map(
		async (detail) =>
			await quantityAdjuster("SUM", "UPD", detail, purchase.purchase_details.filter((elm) => elm.product_id === detail.product_id)[0]),
	);
};

export const deletePurchaseService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const purchase = await getPurchase(id);
	if (!purchase) {
		throw new NotFound("Compra");
	}

	await deletePurchase(id);
	purchase.purchase_details.map(
		async (detail) =>
			await quantityAdjuster("SUM", "DEL", detail, {}),
	);
};
