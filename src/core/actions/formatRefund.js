export default function formatRefund(data) {
  data.refund_details = data.refund_details.map(({ products, ...refund_details }) => ({
    ...refund_details,
    code_p: products?.code,
  }));

  const { sales, ...rest } = data;
  data = { code_s: sales?.code, ...rest };

  return data;
}
