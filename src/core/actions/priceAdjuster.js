import {
  getProductService,
  updateProductService,
} from "../../products/products.service.js";

export default async function priceAdjuster(detalles) {
  const product = await getProductService({
    req: { params: { id: detalles.product_id } },
  });
  if (detalles.tipo === "RES") {
    product.precio = product.precio - detalles.cantidad * detalles.precio;
  }
  if (detalles.tipo === "SUM") {
    product.precio = product.precio + detalles.cantidad * detalles.precio;
  }
  await updateProductService({
    req: { params: { id: product.product_id }, body: product },
  });
}