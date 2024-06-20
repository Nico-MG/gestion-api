import {
	getCountProducts,
	getCountSales,
	getPriceSales,
} from "./analytics.model.js";

export const getAnalyticData = async () => {
	const countP = await getCountProducts();
	const countS = await getCountSales();
	const sumaPrice = (await getPriceSales()).reduce(
		(sum, item) => sum + item.quantity,
		0,
	);

	const countC = (await getCountCustomers()).reduce(
		(sum, item) => sum + item.count,
		0,
	);

	return {
		countP,
		countS,
		sumaPrice,
		countC,
	};
};
