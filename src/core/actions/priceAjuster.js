import db from "../database/connection.js";

const updatePriceProducts = async (newPrice) => {
	await db.products.updateMany({
		data: {
			price: newPrice,
		},
	});
};
export default async function priceAjuster(original, detalles) {
	if (!original || !detalles) {
		return;
	}

	const largoOriginal = original.length;
	const largoDetalles = detalles.length;
	if (largoOriginal === 0 && largoDetalles === 0) {
		return;
	}

	const sumaOriginal = original.reduce(
		(acc, product) => acc + product.price,
		0,
	);
	const sumaDetalles = detalles.reduce(
		(acc, detalle) => acc + detalle.price,
		0,
	);
	const newPrice =
		(sumaOriginal * largoOriginal + sumaDetalles * largoDetalles) /
		(largoOriginal + largoDetalles);

	await updatePriceProducts(newPrice);
}
