import EmptyFoodNameError from './errors/EmptyFoodNameError';
import InvalidFoodAmountError from './errors/InvalidFoodAmountError';
import Nutritions from './Nutritions';
import Units from './Units';

class Food {
  private currentValues: Nutritions;

  constructor(
    private readonly name: string,
    private readonly unit: Units,
    private readonly baseValues: Nutritions
  ) {
    this.validateFoodName(name);
    this.validateFoodAmount(baseValues.amount);
    this.currentValues = { ...baseValues }
  }

  private validateFoodAmount(amount: number) {
    if (amount <= 0) {
      throw new InvalidFoodAmountError(amount);
    }
  }

  private validateFoodName(name: string) {
    if (name.length === 0) {
      throw new EmptyFoodNameError();
    }
  }

  getName(): string {
    return this.name
  }

  getUnit(): string {
    return this.unit
  }

  getBaseValues(): Nutritions {
    return this.baseValues
  }

  getCurrentValues(): Nutritions {
    return this.currentValues
  }

  changeAmount(amount: number) {
    this.validateFoodAmount(amount)
    this.currentValues.amount = amount
    this.currentValues.calories = this.calculateCaloriesFromAmount()
  }

  calculateCaloriesFromAmount() {
    return Math.ceil(
      this.currentValues.amount
      * this.baseValues.calories
      / this.baseValues.amount
    )
  }
}

export default Food;
