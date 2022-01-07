import EmptyFoodNameError from './errors/EmptyFoodNameError';
import InvalidFoodAmountError from './errors/InvalidFoodAmountError';
import Nutritions from './Nutritions';

class Food {
  private currentValues: Nutritions;

  constructor(
    private readonly name: string,
    private readonly unit: string,
    private readonly baseValues: Nutritions
  ) {
    this.validateFoodName(name);
    this.validateFoodAmount(baseValues);
    this.currentValues = { ...baseValues }
  }

  private validateFoodAmount(baseValues: Nutritions) {
    if (baseValues.amount <= 0) {
      throw new InvalidFoodAmountError(baseValues.amount);
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
}

export default Food;
