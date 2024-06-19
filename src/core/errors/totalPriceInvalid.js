export default class TotalPriceInvalid extends Error {
	constructor(precio) {
		super(`El precio ${precio} no es valido`);
	}
}
