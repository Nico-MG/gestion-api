import {
	getCatProducts,
	getCountSales,
	getCountRefunds,
	getCountProviders,
	getCountPurchases,
	getPriceSales,
	getPriceAndDateSales,
} from "./analytics.model.js";

export const getAnalyticData = async () => {
	const catProducts = (await getCatProducts()).reduce(
		(sum, item) => sum + item.quantity,
		0,
	);

	// counts
	const countSales = await getCountSales();
	const countRefunds = await getCountRefunds();
	const countProviders = await getCountProviders();
	const countPurchases = await getCountPurchases();

	const sumTotalSales = (await getPriceSales()).reduce(
		(sum, item) => sum + item.price,
		0,
	);

	const datePriceSales = await getPriceAndDateSales(
		startDate, endDate, minPrice, maxPrice
	);

	return {
		catProducts,

		countSales,
		countRefunds,
		countProviders,
		countPurchases,

		sumTotalSales,
		datePriceSales,
	};
};
