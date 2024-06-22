import { invertMapping } from "../actions/adapter.js";
export default function filterHelper(
	iMap,
	data,
	{ desde, hasta, dato, numero, texto },
) {
	let result = data.fecha
		? data.filter((item) => item.fecha >= desde && item.fecha <= hasta)
		: data;
	const mapping = invertMapping(iMap);
	if (numero !== 0) {
		result = result.filter((item) => item[mapping[dato]] === numero);
	}
	if (texto !== "") {
		result = result.filter((item) =>
			item[mapping[dato]].toLowerCase().includes(texto.toLowerCase()),
		);
	}
	return result;
}
