export default function formatRefund(data) {
	data.cods = data.ventas?.code;
	data.detalles = data.detalles.map(({ productos, ...detalle }) => ({
		...detalle,
		cod: productos?.code,
		cits: data.ventas?.sale_details?.filter((elm) => elm.product_id === productos?.product_id)?.quantity,
	}));

	return data;
}
