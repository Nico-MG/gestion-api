const iProduct = {
	idp: ["product_id", "string"],
	nombre: ["name", "string"],
	cat: ["type", "string"],
	cit: ["quantity", "number"],
	mCit: ["min_quantity", "number"],
	precio: ["price", "number"],
};

const iUser = {
	rutu: ["user_rut", "string"],
	email: ["mail", "string"],
	pwd: ["password", "string"],
	nombre: ["name", "string"],
	apellido: ["lastname", "string"],
};

const iOrder = {
	ido: ["order_id", "string"],
	rutp: ["provider_rut", "string"],
	rutu: ["user_rut", "string"],
	fecha: ["date", "datetime"],
	total: ["total_purchase", "number"],
};

const iOrderDetails = {
	ido: ["order_id", "string"],
	idp: ["product_id", "string"],
	cit: ["quantity", "number"],
	precio: ["unit_price", "number"],
	suma: ["line_total", "number"],
};

const iProvider = {
	rutp: ["provider_rut", "string"],
	nombre: ["name", "string"],
	lugar: ["address", "number"],
	numero: ["phone", "number"],
	tipo: ["type", "number"],
};

const tables = {
	products: iProduct,
	users: iUser,
	orders: iOrder,
	orders_details: iOrderDetails,
	providers: iProvider,
};

export default tables;
