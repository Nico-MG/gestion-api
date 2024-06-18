export default class CodeRepeat extends Error {
	constructor(model, code) {
		super(`El ${model} ya tiene el codigo ${code}`);
	}
}
