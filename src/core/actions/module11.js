/**
 * Valida un RUT de un producto.
 * @param {string} rut - El RUT del producto.
 * @returns {boolean} True si el RUT es válido, false en caso contrario.
 */
export default function moduleRut(rut) {
	const cleanRut = rut.replace("/./g", "").replace("-", "");

	const rutBody = cleanRut.slice(0, -1);
	const verificador = cleanRut.slice(-1).toUpperCase();

	if (!/^\d+$/.test(rutBody)) {
		return false;
	}

	const rutDigits = rutBody.split("").map(Number);

	let multiplier = 2;
	let sum = 0;

	for (let i = rutDigits.length - 1; i >= 0; i--) {
		sum += rutDigits[i] * multiplier;
		multiplier = multiplier === 7 ? 2 : multiplier + 1;
	}

	const expectedVerifier = 11 - (sum % 11);
	const expectedVerifierChar =
		expectedVerifier === 11
			? "0"
			: expectedVerifier === 10
				? "K"
				: expectedVerifier.toString();

	return verificador === expectedVerifierChar;
}
