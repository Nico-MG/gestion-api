import db from "../core/db/prisma.js";

const createSale = async (id, rutc, rutu, fecha, venta, dSale) => {
	return await db.venta.create({
		data: {
			id_venta: id,
			rut_cliente: rutc,
			rut_usuario: rutu,
			fecha,
			venta_total: venta,
			detalle_venta: {
				create: dSale,
			},
		},
	});
};

const updateSale = async (id, newId, rutc, rutu, fecha, venta, dSale) => {
	await Promise.all(
		dSale.map(async (detalle) => {
			await db.detalle_venta.update({
				where: {
					id_venta_id_producto: {
						id_venta: id,
						id_producto: detalle.id_producto,
					},
				},
				data: {
					cantidad: detalle.cantidad,
					precio_unidad: detalle.precio_unidad,
					precio_total: detalle.precio_total,
				},
			});
		}),
	);

	return await db.venta.update({
		where: {
			id_venta: id,
		},
		data: {
			id_venta: newId,
			rut_cliente: rutc,
			rut_usuario: rutu,
			fecha,
			venta_total: venta,
		},
	});
};

const deleteSale = async (id) => {
	return await db.venta.delete({
		where: {
			id_venta: id,
		},
	});
};

const getSale = async (id) => {
	return await db.venta.findUnique({
		where: {
			id_venta: id,
		},
		include: {
			detalle_venta: true,
		},
	});
};

const getAllSales = async () => {
	return await db.venta.findMany({
		include: {
			detalle_venta: true,
		},
	});
};

export { createSale, updateSale, deleteSale, getAllSales, getSale };
