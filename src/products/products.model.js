import db from "../core/db/connection.js";

const getAllProducts = async () => {
	return await db.producto.findMany();
};

const getProduct = async (id) => {
	return await db.producto.findUnique({
		where: {
			id_producto: id,
		},
	});
};

const createProduct = async (body) => {
	return await db.producto.create({
		data: body,
	});
};

const updateProduct = async (id, body) => {
	return await db.producto.update({
		where: { id_producto: id },
		data: body,
	});
};

const deleteProduct = async (id) => {
	return await db.producto.delete({
		where: {
			id_producto: id,
		},
	});
};

export {
	getAllProducts,
	getProduct,
	deleteProduct,
	createProduct,
	updateProduct,
};
