/**
 * Error que se lanza cuando se intenta acceder a un modelo que no existe.
 */
export default class NotFound extends Error {
	constructor(modelo) {
		super(`${modelo} no encontrado`);
	}
}
