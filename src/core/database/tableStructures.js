export const iProduct = {
	idp: "product_id",
	cod: "code",
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
	rol: "role",
};

export const iPurchase = {
	idpu: "purchase_id",
	cod: "code",
	rutp: "provider_rut",
	rutu: "user_rut",
	fecha: "date",
	total: "total_price",
};

export const iPurchaseDetails = {
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

export const iSales = {
	ids: "sale_id",
	cod: "code",
	rutc: "client_rut",
	rutu: "user_rut",
	fecha: "date",
	precio: "total_price",
};

export const iSalesDetails = {
	idp: "product_id",
	cit: "quantity",
	precio: "unit_price",
	total: "line_total",
};
