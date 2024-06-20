/**
 * Error que se lanza cuando el rut ingresado no es válido.
 */
export default class InvalidRut extends Error {
	constructor(rut) {
		super(`El rut ingresado ${rut} no es valido`);
	}
}
