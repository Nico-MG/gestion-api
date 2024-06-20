import NotFound from "../core/errors/notFound.js";
import CodeRepeat from "../core/errors/codeRepeat.js";
import {
	iPurchase,
	iPurchaseDetails,
} from "../core/database/tableStructures.js";
import {
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
} from "./purchases.model.js";

export const getAllPurchasesService = async (req) => {
	const query = {
		dato: iPurchase[req.query.dato] || "purchase_id",
		orden: req.query.orden || "asc",
		limit: Number.parseInt(req.query.limit) || 10,
		offset: Number.parseInt(req.query.offset) || 0,
	};

	const allPurchases = await getAllPurchases(query);

	const adaptedPurchases = allPurchases.map((purchase) =>
		adapterToFrontWithDetails(iPurchase, iPurchaseDetails, purchase),
	);

	const formattedPurchases = adaptedPurchases.map(purchase => ({
		...purchase,
		detalles: purchase.detalles.map(({undefined, ...detalle}) => ({
			...detalle,
			cod: detalle.undefined?.code,
		})),
	}));

	return formattedPurchases;
};

export const getPurchaseService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const purchase = await getPurchase(id);
	if (!purchase) {
		throw new NotFound("Compra");
	}

	const adaptedPurchase = adapterToFrontWithDetails(iPurchase, iPurchaseDetails, purchase);
	return adaptedPurchase;
};

export const createPurchaseService = async (req) => {
	const purchase = await getCodePurchase(req.body.cod);
	if (purchase === 1) {
		throw new CodeRepeat("compra", req.body.cod);
	}

	const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
		iPurchase,
		iPurchaseDetails,
		req.body,
	);
	await createPurchase(adaptedBody, adaptedDetails);
};

export const updatePurchaseService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const purchase = await getPurchase(id);
	const purchaseCode = await getCodePurchase(req.body.cod);
	if (!purchase) {
		throw new NotFound("Compra");
	}
	if (purchaseCode.length > 1) {
		throw new CodeRepeat("compra", req.body.cod);
	}

	const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
		iPurchase,
		iPurchaseDetails,
		req.body,
	);
	await updatePurchase(id, adaptedBody, adaptedDetails);
};

export const deletePurchaseService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const purchase = await getPurchase(id);
	if (!purchase) {
		throw new NotFound("Compra");
	}

	await deletePurchase(id);
};