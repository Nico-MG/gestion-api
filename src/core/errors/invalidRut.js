export default class InvalidRut extends Error {
	constructor(rut, nombre, apellido) {
		super(`El rut ingresado ${rut} de ${nombre} ${apellido} no es valido`);
	}
}
