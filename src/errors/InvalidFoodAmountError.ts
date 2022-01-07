export default class InvalidFoodAmountError extends Error {
  constructor(amount: number) {
    super(`Invalid amount ${amount}. Must be a positive number`)
  }
}
