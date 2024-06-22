import db from "../core/database/connection.js";

export const getAllProducts = async ({ limit, offset, dato, orden }) => {
	return await db.products.findMany({
		orderBy: {
			[dato]: orden,
		},
		take: limit,
		skip: offset,
	});
};

export const getProduct = async (id) => {
	return db.products.findUnique({
		where: { product_id: id },
	});
};

export const getCodeProduct = async (code) => {
	return db.products.findMany({
		where: { code: code },
	});
};

export const getProductsCount = async () => {
	return await db.products.count();
};

export const createProduct = async (body) => {
	await db.products.create({
		data: body,
	});
};

export const updateProduct = async (id, body) => {
	await db.products.update({
		where: { product_id: id },
		data: body,
	});
};

export const deleteProduct = async (id) => {
	await db.products.delete({
		where: {
			product_id: id,
		},
	});
};
