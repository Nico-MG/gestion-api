import db from "../core/db/prisma.js";

const createProduct = async (
	id,
	nombre,
	categoria,
	cantidad,
	minCantidad,
	precio,
) => {
	return await db.producto.create({
		data: {
			id_producto: id,
			nombre,
			categoria,
			cantidad,
			min_cantidad: minCantidad,
			precio_venta: precio,
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
	newId,
	nombre,
	categoria,
	cantidad,
	minCantidad,
	precio,
) => {
	return await db.producto.update({
		where: {
			id_producto: id,
		},
		data: {
			id_producto: newId,
			nombre,
			categoria,
			cantidad,
			min_cantidad: minCantidad,
			precio_venta: precio,
		},
	});
};

const getProduct = async (id) => {
	return await db.producto.findUnique({
		where: {
			id_producto: id,
		},
	});
};

const getAllProducts = async () => {
	return await db.producto.findMany();
};

export { getAllProducts, getProduct, deleteProduct, createProduct, updateProduct };
