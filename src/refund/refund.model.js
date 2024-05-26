import db from "../core/db/prisma.js";

const createRefund = async (id, idv, fecha, desc, dRefund) => {
	return await db.devolucion.create({
		data: {
			id_devolucion: id,
			id_venta: idv,
			fecha,
			descripcion: desc,
			detalle_devolucion: {
				create: dRefund,
			},
		},
	});
};

const updateRefund = async (id, newId, idv, fecha, desc, dRefund) => {
  await Promise.all(
    dRefund.map(async (detalle) => {
      await db.detalle_devolucion.update({
        where: {
          id_devolucion_id_producto: {
            id_devolucion: id,
            id_producto: detalle.id_producto,
          },
        },
        data: {
          cantidad: detalle.cantidad,
        },
      });
    })
  );

  return await db.devolucion.update({
    where: {
      id_devolucion: id,
    },
    data: {
			id_devolucion: newId,
			id_venta: idv,
			fecha,
			descripcion: desc,
    },
  });
};


const deleteRefund = async (id) => {
	return await db.devolucion.delete({
		where: {
			id_devolucion: id,
		},
	});
};

const getRefund = async (id) => {
	return await db.devolucion.findUnique({
		where: {
			id_devolucion: id,
		},
		include: {
			detalle_devolucion: true,
		},
	});
};

const getAllRefunds = async () => {
	return await db.devolucion.findMany({
		include: {
			detalle_devolucion: true,
		},
	});
};

export { createRefund, updateRefund, deleteRefund, getAllRefunds, getRefund };
