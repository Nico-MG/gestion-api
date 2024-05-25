import db from "../db/prisma.js";

export default (id) => {
	const producto = db.producto.findUnique({
		where: {
			id_producto: id,
		},
	});

	producto.cantidad;
};
