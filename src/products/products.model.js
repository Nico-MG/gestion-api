import db from "../core/database/connection.js";

export const getAllProducts = async () => {
	return await db.products.findMany({
		where: {
			status: true,
		},
		omit: {
			createdAt: true,
			updatedAt: true,
			status: true,
		},
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

export const getAllTypes = async () => {
	return await db.products.findMany({
		select: {
			type: true,
		},
		distinct: ["type"],
	});
};

export const getAllProductCodes = async () => {
	return await db.products.findMany({
		select: {
			code: true,
		},
		distinct: ["code"],
	});
};

export const getProductsCount = async () => {
	return await db.products.count({
		where: {
			status: true,
		}
	});
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
	await db.products.update({
		where: {
			product_id: id,
		},
		data: {
			status: false,
		}
	});
};
