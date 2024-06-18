export default class InvalidRut extends Error {
	constructor(rut) {
		super(`El rut ingresado ${rut} no es valido`);
	}
}
