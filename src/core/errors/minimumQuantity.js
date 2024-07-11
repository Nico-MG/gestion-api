export default class MinimumQuantity extends Error {
  constructor(id, name) {
    super("Hay productos que superan el limite de cantidad en la venta");
  }
}