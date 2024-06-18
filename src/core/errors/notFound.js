export default class NotFound extends Error {
	constructor(modelo) {
		super(`${modelo} no encontrado`);
	}
}
