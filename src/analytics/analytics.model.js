import db from "../core/database/connection.js";

export const getCatProducts = async () => {
	return await db.products.findMany({
		select: {
			quantity: true,
		},
	});
};

// counts
export const getCountSales = async () => {
	return await db.sales.count();
};

export const getCountRefunds = async () => {
	return await db.refunds.count();
};

export const getCountProviders = async () => {
	return await db.providers.count();
};

export const getCountPurchases = async () => {
	return await db.purchases.count();
};

export const getTopProductsSales = async () => {
	return await db.saleDetails.findMany({
		select: {
			quantity: true,
			products: {
				select: {
					name: true,
					code: true,
				},
			},
		},
		orderBy: {
			quantity: "desc",
		},
	});
};

export const getPriceSales = async () => {
	return await db.sales.findMany({
		select: {
			total_price: true,
		},
	});
};

export const getPriceAndDateSales = async () => {
	return await db.sales.findMany({
		select: {
			total_price: true,
			date: true,
		},
	});
};
