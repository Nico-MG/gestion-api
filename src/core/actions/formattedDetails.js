export default function formattedDetails(details) {
	return details.map(({ productos, ...detalle }) => ({
		...detalle,
		cod: productos?.code,
	}));
}