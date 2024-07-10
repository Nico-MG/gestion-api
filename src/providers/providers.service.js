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
	getAllProviderTypes,
} from "./providers.model.js";
import filterHelper from "../core/actions/filterHelper.js";

export const getAllProvidersService = async (req) => {
	let content = await getAllProviders();
	const {result, largo} = filterHelper(iProvider, content, req.query);
	content = result.map((provider) => adapterToFront(iProvider, provider));
	return {content, largo};
};

export const getProvidersCountService = async () => {
	return await getProvidersCount();
};

export const getAllProviderTypesService = async () => {
	const types = await getAllProviderTypes();
	const typesValues = types.map((type) => type.type);
	return typesValues;
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
