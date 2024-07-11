export default function formattedDetails(data) {
  data.detalles = data.detalles.map(({ productos, ...detalle }) => ({
    ...detalle,
    cod: productos?.code,
  }));
  const { devoluciones, ...rest } = data;
  data = { ...rest, idr: devoluciones[0]?.refund_id || null };
  return data;
}
