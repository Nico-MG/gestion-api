import db from "../core/db/connection.js";

const getProduct = async (id) => {
	return await db.producto.findUnique({
		where: {
			id_producto: id,
		},
	});
};

const getAllProducts = async () => {
	const data = await db.producto.findMany();
	const newData = [];
	for (const product of data) {
		const newProduct = {};
		newProduct.idp = product.id_producto;
		// TODO: otros atributos
		newData.push(newProduct);
	}

	return newData;
};

const createProduct = async ({
	id_producto,
	nombre,
	categoria,
	cantidad,
	min_cantidad,
	precio_venta,
}) => {
	return await db.producto.create({
		data: {
			id_producto,
			nombre,
			categoria,
			cantidad,
			min_cantidad,
			precio_venta,
		},
	});
};

const deleteProduct = async (id) => {
	return await db.producto.delete({
		where: {
			id_producto: id,
		},
	});
};

const updateProduct = async (
	id,
	{ id_producto, nombre, categoria, cantidad, min_cantidad, precio_venta },
) => {
	return await db.producto.update({
		where: { id_producto: id },
		data: {
			id_producto,
			nombre,
			categoria,
			cantidad,
			min_cantidad,
			precio_venta,
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