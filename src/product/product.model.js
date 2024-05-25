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

const editProduct = async (
	id,
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

const getAllProduct = async () => {
	return await db.producto.findMany();
};

export { getAllProduct, getProduct, deleteProduct, createProduct, editProduct };
