/**
 * Error que se lanza cuando se intenta crear un modelo con un código repetido.
 */
export default class CodeRepeat extends Error {
	constructor(model, code) {
		super(`Ya existe un ${model} con el codigo ${code}`);
	}
}
