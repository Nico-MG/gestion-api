// Define el mapeo de productos
export const mapProducts = {
	idp: "product_id",
	nombre: "name",
	tipo: "type",
	cantidad: "quantity",
	min_cantidad: "min_quantity",
	precio: "price",
};
export const mapClients = {
	client_rut: "client_rut",
	name: "name",
	lastname: "lastname",
	sales: "sales",
};

export const mapRefundDetails = {
	refund_id: "refund_id",
	product_id: "product_id",
	quantity: "quantity",
	refunds: "refunds",
	products: "products",
};

export const mapOrderDetails = {
	order_id: "order_id",
	product_id: "product_id",
	quantity: "quantity",
	unit_price: "unit_price",
	line_total: "line_total",
	orders: "orders",
	products: "products",
};

export const mapSaleDetails = {
	sale_id: "sale_id",
	product_id: "product_id",
	quantity: "quantity",
	unit_price: "unit_price",
	line_total: "line_total",
	products: "products",
	sales: "sales",
};

export const mapRefunds = {
	refund_id: "refund_id",
	sale_id: "sale_id",
	date: "date",
	description: "description",
	image_refund: "image_refund",
	refund_details: "refund_details",
	sales: "sales",
};

export const mapNotifications = {
	notification_id: "notification_id",
	date: "date",
	product_id: "product_id",
	title: "title",
	description: "description",
	products: "products",
};

export const mapOrders = {
	order_id: "order_id",
	provider_rut: "provider_rut",
	user_rut: "user_rut",
	date: "date",
	total_purchase: "total_purchase",
	order_details: "order_details",
	providers: "providers",
	users: "users",
};

export const mapProviders = {
	provider_rut: "provider_rut",
	name: "name",
	address: "address",
	phone: "phone",
	type: "type",
	orders: "orders",
};

export const mapUsers = {
	user_rut: "user_rut",
	mail: "mail",
	password: "password",
	name: "name",
	lastname: "lastname",
	orders: "orders",
	sales: "sales",
};

export const mapSales = {
	ids: "sale_id",
	client_rut: "client_rut",
	user_rut: "user_rut",
	date: "date",
	total_price: "total_price",
	sale_details: "sale_details",
	refunds: "refunds",
	clients: "clients",
	users: "users",
};

// [[dale_id, sale_id],[cl,cl],]

// Función para convertir datos del frontend a la estructura de la base de datos
export const adapterDB = (mapping, reqBody) =>
	Object.entries(reqBody).reduce((mapData, [frontKey, value]) => {
		const dbKey = mapping[frontKey];
		if (dbKey) {
			mapData[dbKey] = value;
		}
		return mapData;
	}, {});

// Función para invertir el mapeo
const invertMapping = (mapping) =>
	Object.entries(mapping).reduce((inv, [key, value]) => {
		inv[value] = key;
		return inv;
	}, {});

// Función para convertir datos de la base de datos a la estructura del frontend
export const adapterFront = (mapping, reqBody) => {
	const invMap = invertMapping(mapping);
	return Object.entries(reqBody).reduce((mapData, [dbKey, value]) => {
		const frontKey = invMap[dbKey];
		if (frontKey) {
			mapData[frontKey] = value;
		}
		return mapData;
	}, {});
};
