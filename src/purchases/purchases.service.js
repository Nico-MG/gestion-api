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
import quantityAdjuster from "../core/actions/quantityAjuster.js";
import priceAjuster from "../core/actions/priceAjuster.js";
import filterHelper from "../core/actions/filterHelper.js";
import formattedDetails from "../core/actions/formattedDetails.js";

export const getAllPurchasesService = async (req) => {
	const query = {
		dato: iPurchase[req.query.dato] || "purchase_id",
		orden: req.query.orden || "asc",
		limit: Number.parseInt(req.query.limit) || 10,
		offset: Number.parseInt(req.query.offset) || 0,
		desde: req.query.desde || "2000-01-01",
		hasta: req.query.hasta || "2099-12-31",
		numero: Number.parseInt(req.query.numero) || 0,
		texto: req.query.texto || "",
	};

	const allPurchases = await getAllPurchases(query);

	const adaptedPurchases = allPurchases.map((purchase) =>
		adapterToFrontWithDetails(iPurchase, iPurchaseDetails, purchase),
	);

	const formattedPurchases = formattedDetails(adaptedPurchases);
	return filterHelper(iPurchase, formattedPurchases, query)

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

	//await priceAjuster(adaptedDetails);
	await createPurchase(adaptedBody, adaptedDetails);
	//await quantityAdjuster("PUR", "ADD", adaptedDetails, []);
};

export const updatePurchaseService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const purchase = await getPurchase(id);
	const purchaseCode = await getCodePurchase(req.body.cod);
	if (!purchase) {
		throw new NotFound("Compra");
	}
	if (
		purchaseCode.length > 0 &&
		purchaseCode[0].purchase_id !== req.body.idpu
	) {
		throw new CodeRepeat("compra", req.body.cod);
	}

	const { adaptedBody, adaptedDetails } = adapterToDBWithDetails(
		iPurchase,
		iPurchaseDetails,
		req.body,
	);
	//await priceAjuster(adaptedDetails);
	await updatePurchase(id, adaptedBody, adaptedDetails);
	//await quantityAdjuster("PUR", "UPD", adaptedDetails, purchase.detalles);
};

export const deletePurchaseService = async (req) => {
	const id = Number.parseInt(req.params.id);
	const purchase = await getPurchase(id);
	if (!purchase) {
		throw new NotFound("Compra");
	}

	await deletePurchase(id);
	//await quantityAdjuster("PUR", "DEL", purchase.detalles, []);
};
