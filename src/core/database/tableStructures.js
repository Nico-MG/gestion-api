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
	apellido: ["lastname", "string"]
}

const tables = {
	products: iProduct,
	users: iUser
};

export default tables;
