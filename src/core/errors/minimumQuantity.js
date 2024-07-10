export default class MinimumQuantity extends Error {
  constructor(id, name) {
    super(`El producto ${name} de id ${id} superó el mínimo establecido`);
  }
}