export default class CodeRepeat extends Error {
	constructor(model, code) {
		super(`Ya existe un ${model} con el codigo ${code}`);
	}
}
