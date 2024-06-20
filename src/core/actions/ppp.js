import db from "../database/connection.js";

/**
 * Extracts the price of a product from the product object.
 * @param {Object} product - The product object.
 */
const updatePriceProducts = async (newPrice) => {
	await db.products.updateMany({
		data: {
			price: newPrice,
		}
	})
};

/**
 * Calculates the price of a product based on the original price and the
 * prices of the products that are included in the product.
 * @param {Object} original - The original product object.
 * @param {Array} detalles - The products that are included in the original product.
 */
export default async function ppp(original, detalles) {
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
