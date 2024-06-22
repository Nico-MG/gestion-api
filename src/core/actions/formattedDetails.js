export default function formattedDetails(data) {
	data.detalles = data.detalles.map(({ productos, ...detalle }) => ({
		...detalle,
		cod: productos?.code,
	}));
	return data;
}
