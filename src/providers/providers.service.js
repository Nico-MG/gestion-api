import NotFound from "../core/errors/notFound.js";
import InvalidRut from "../core/errors/invalidRut.js";
import moduleRut from "../core/actions/module11.js";
import { iProvider } from "../core/database/tableStructures.js";
import { adapterToDB, adapterToFront } from "../core/actions/adapter.js";
import {
	getAllProviders,
	getProviderByRut,
	createProvider,
	updateProvider,
	deleteProvider,
	getProvidersCount,
} from "./providers.model.js";
import filterHelper from "../core/actions/filterHelper.js";

export const getAllProvidersService = async (req) => {
	let content = await getAllProviders();
	content = filterHelper(iProvider, content, req.query);
	content = content.map((provider) => adapterToFront(iProvider, provider));

	return content;
};

export const getProvidersCountService = async () => {
	return await getProvidersCount();
};

export const createProviderService = async (req) => {
	if (!moduleRut(req.body.rutp)) {
		throw new InvalidRut(req.body.rutp);
	}

	const data = adapterToDB(iProvider, req.body);
	await createProvider(data);
};

export const updateProviderService = async (req) => {
	if (!moduleRut(req.params.rut)) {
		throw new InvalidRut(req.params.rut);
	}
	if (!moduleRut(req.body.rutp)) {
		throw new InvalidRut(req.body.rutp);
	}
	const provider = await getProviderByRut(req.params.rut);
	if (!provider) {
		throw new NotFound("Proveedor");
	}

	const data = adapterToDB(iProvider, req.body);
	await updateProvider(req.params.rut, data);
};

export const deleteProviderService = async (req) => {
	if (!moduleRut(req.params.rut)) {
		throw new InvalidRut(req.params.rut);
	}
	const provider = await getProviderByRut(req.params.rut);
	if (!provider) {
		throw new NotFound("Proveedor");
	}

	await deleteProvider(req.params.rut);
};
