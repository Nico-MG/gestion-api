import NotFound from "../core/errors/notFound.js";
import InvalidRut from "../core/errors/invalidRut.js";
import moduleRut from "../core/actions/module11.js";
import { iProvider } from "../core/database/tableStructures.js";
import { adapterToDB, adapterToFront } from "../core/actions/adapter.js";
import {
	getAllProviders,
	getProvider,
	createProvider,
	updateProvider,
	deleteProvider,
	getProvidersCount,
} from "./providers.model.js";
import filterHelper from "../core/actions/filterHelper.js";

export const getAllProvidersService = async (req) => {
	const query = {
		dato: iProvider[req.query.dato] || "provider_rut",
		orden: req.query.orden || "asc",
		limit: Number.parseInt(req.query.limit) || 10,
		offset: Number.parseInt(req.query.offset) || 0,
		desde: req.query.desde || "2000-01-01",
		hasta: req.query.hasta || "2099-12-31",
		numero: Number.parseInt(req.query.numero) || 0,
		texto: req.query.texto || "",
	};

	const allProviders = await getAllProviders(query);

	const adaptedProviders = allProviders.map((provider) =>
		adapterToFront(iProvider, provider),
	);

	return filterHelper(iProvider, adaptedProviders, query);
};

export const getProvidersCountService = async () => {
	return await getProvidersCount();
};

export const createProviderService = async (req) => {
	if (!moduleRut(req.body.rutp)) {
		throw new InvalidRut(req.body.rutp);
	}

	const createdProvidertData = adapterToDB(iProvider, req.body);
	await createProvider(createdProvidertData);
};

export const updateProviderService = async (req) => {
	const provider = await getProvider(req.params.id);
	if (!provider) {
		throw new NotFound("Proveedor");
	}
	if (!moduleRut(req.params.id)) {
		throw new InvalidRut(req.params.id);
	}

	const updatedProviderData = adapterToDB(iProvider, req.body);
	await updateProvider(req.params.id, updatedProviderData);
};

export const deleteProviderService = async (req) => {
	const product = await getProvider(req.params.id);
	if (!product) {
		throw new NotFound("Proveedor");
	}

	await deleteProvider(req.params.id);
};
