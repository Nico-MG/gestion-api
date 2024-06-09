export const iProduct = {
	idp: "product_id",
	nombre: "name",
	cat: "type",
	cit: "quantity",
	mCit: "min_quantity",
	precio: "price",
};

export const iUser = {
	rutu: "user_rut",
	email: "mail",
	pwd: "password",
	nombre: "name",
	apellido: "lastname",
};

export const iOrder = {
	ido: "order_id",
	rutp: "provider_rut",
	rutu: "user_rut",
	fecha: "date",
	total: "total_purchase",
};

export const iOrderDetails = {
	ido: "order_id",
	idp: "product_id",
	cit: "quantity",
	precio: "unit_price",
	suma: "line_total",
};

export const iProvider = {
	rutp: "provider_rut",
	nombre: "name",
	lugar: "address",
	numero: "phone",
	tipo: "type",
};
