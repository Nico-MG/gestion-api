import db from "../core/database/connection.js";

const getAllProducts = async () => {
	return await db.products.findMany();
};

const getProduct = async (id) => {
	return await db.products.findUnique({
		where: {
			product_id: id,
		},
	});
};

const createProduct = async (body) => {
	return await db.products.create({
		data: body,
	});
};

const updateProduct = async (id, body) => {
	return await db.products.update({
		where: { product_id: id },
		data: body,
	});
};

const deleteProduct = async (id) => {
	return await db.products.delete({
		where: {
			product_id: id,
		},
	});
};

const filtersProducts = async ({ limit, offset, dato, orden }) => {
	return await db.products.findMany({
		orderBy: {
			[dato]: orden,
		},
		take: limit,
		skip: offset,
	});
};

export {
	getAllProducts,
	getProduct,
	deleteProduct,
	createProduct,
	updateProduct,
	filtersProducts,
};
