export const iProduct = {
	idp: "product_id",
	cod: "code",
	nombre: "name",
	cat: "type",
	cit: "quantity",
	mCit: "min_quantity",
	precio: "price",
	creado: "createdAt",
};

export const iUser = {
	rutu: "user_rut",
	email: "mail",
	pwd: "password",
	nombre: "name",
	apellido: "lastname",
	rol: "role",
	estado: "status",
	creado: "createdAt",
};

export const iPurchase = {
	idpu: "purchase_id",
	cod: "code",
	rutp: "provider_rut",
	rutu: "user_rut",
	fecha: "date",
	total: "total_price",
	creado: "createdAt",
};

export const iPurchaseDetails = {
	idp: "product_id",
	cit: "quantity",
	precio: "unit_price",
	suma: "line_total",
	estado: "status",
	productos: "products",
};

export const iProvider = {
	rutp: "provider_rut",
	nombre: "name",
	lugar: "address",
	numero: "phone",
	tipo: "type",
	creado: "createdAt",
};

export const iSales = {
	ids: "sale_id",
	cod: "code",
	rutc: "client_rut",
	rutu: "user_rut",
	fecha: "date",
	total: "total_price",
	devoluciones: "refunds", // extra
};

export const iSalesDetails = {
	idp: "product_id",
	cit: "quantity",
	precio: "unit_price",
	suma: "line_total",
	productos: "products",
};

export const iRefund = {
	idr: "refund_id",
	ids: "sale_id",
	codr: "code",
	cod: "code_s", // extra
	fecha: "date",
	desc: "description",
	nota: "note_refund",
	ventas: "sales", // extra
};

export const iRefundDetails = {
	idp: "product_id",
	citr: "quantity",
	cit: "sale_quantity", // extra
	cod: "code_p", // extra
	productos: "products", // extra
};

export const iNotifications = {
        idn : "notification_id",
        idp:  "product_id",    
        titulo: "title" ,   
        desc: "description",
		estado: "status",
        productos: "products",
		creado: "createdAt",
};
