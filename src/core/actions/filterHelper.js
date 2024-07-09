const isNumberValor = (field) => {
  return (
    field === "price" ||
    field === "quantity" ||
    field === "min_quantity" ||
    field === "price" ||
    field === "line_total" ||
    field === "unit_price" ||
    field === "total_price"
  );
};

export default function filterHelper(
  iMap,
  data,
  {
    desde,
    hasta,
    dato,
    valor,
    limit,
    offset,
    orden,
    mayor,
    menor,
    reciente,
    intervalo,
    rol,
    tipo,
    categoria,
  }
) {
  // Validación de parámetros
  dato = dato ? iMap[dato] : Object.values(iMap)[0];
  orden = orden || "";
  limit = Number.parseInt(limit) || 10;
  offset = Number.parseInt(offset) || 0;
  desde = desde || "2000-01-01";
  hasta = hasta || "2099-12-31";
  valor = valor ? (isNumberValor(dato) ? Number.parseInt(valor) : valor) : "";
  mayor = mayor ? Number.parseInt(mayor) : 0;
  menor = menor ? Number.parseInt(menor) : 1000000;
  reciente = reciente || "";
  intervalo = intervalo || "igual";
  rol = rol || "";
  tipo = tipo || "";
  categoria = categoria || "";

  // Filtro de fecha
  let result = iMap.fecha
    ? data.filter((item) => item.date >= desde && item.date <= hasta)
    : data.filter(
        (item) =>
          item.createdAt >= new Date(desde) && item.createdAt <= new Date(hasta)
      );

  // Ordenar por fecha
  result =
    orden === "desc"
      ? result.sort((a, b) => b.createdAt - a.createdAt)
      : result;
  result =
    orden === "asc" ? result.sort((a, b) => a.createdAt - b.createdAt) : result;

  // Ordenación
  result = orden === "desc" ? result.sort((a, b) => b[dato] - a[dato]) : result;
  result = orden === "asc" ? result.sort((a, b) => a[dato] - b[dato]) : result;

  // Filtro de numero
  if (isNumberValor(dato)) {
    if (valor !== "") {
      switch (intervalo) {
        case "igual":
          result = result.filter((item) => item[dato] === valor);
          break;
        case "mayor":
          result = result.filter((item) => item[dato] > valor);
          break;
        case "menor":
          result = result.filter((item) => item[dato] < valor);
          break;
        default:
          break;
      }
    }
  } else if (valor !== "") {
    // Filtro de texto
    result = result.filter((item) =>
      item[dato].toLowerCase().includes(valor.toLowerCase())
    );
  }

  result =
    rol !== "" && rol !== "todos"
      ? result.filter((item) =>
          item["role"].toLowerCase().includes(rol.toLowerCase())
        )
      : result;

  result =
    tipo !== "" && tipo !== "todos"
      ? result.filter((item) =>
          item["type"].toLowerCase().includes(tipo.toLowerCase())
        )
      : result;

  result =
    categoria !== "" && categoria !== "todos"
      ? result.filter((item) =>
          item["type"].toLowerCase().includes(categoria.toLowerCase())
        )
      : result;

  // Paginación
  result = result.slice(offset, offset + limit);
  return result;
}
