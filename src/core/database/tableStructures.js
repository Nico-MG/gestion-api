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
	rol: "role",
};

export const iPurchase = {
	idpu: "purchase_id",
	rutp: "provider_rut",
	rutu: "user_rut",
	fecha: "date",
	total: "total_price",
};

export const iPurchaseDetails = {
	idpu: "purchase_id",
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
