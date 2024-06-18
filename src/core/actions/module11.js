export default function moduleRut(rut) {
	// Eliminar puntos y guión
	const cleanRut = rut.replace("/\./g", "").replace("-", "");

	// Separar el número del verificador
	const rutBody = cleanRut.slice(0, -1);
	const verificador = cleanRut.slice(-1).toUpperCase();

	// Validar que solo queden números en el cuerpo del RUT
	if (!/^\d+$/.test(rutBody)) {
		return false;
	}

	// Convertir el cuerpo del RUT a un array de números
	const rutDigits = rutBody.split("").map(Number);

	// Coeficientes para el cálculo
	let multiplier = 2;
	let sum = 0;

	// Sumar los productos del cálculo módulo 11
	for (let i = rutDigits.length - 1; i >= 0; i--) {
		sum += rutDigits[i] * multiplier;
		multiplier = multiplier === 7 ? 2 : multiplier + 1;
	}

	// Calcular el dígito verificador esperado
	const expectedVerifier = 11 - (sum % 11);
	const expectedVerifierChar =
		expectedVerifier === 11
			? "0"
			: expectedVerifier === 10
				? "K"
				: expectedVerifier.toString();

	// Comparar el dígito verificador esperado con el proporcionado
	return verificador === expectedVerifierChar;
}
