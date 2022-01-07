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
    this.calculateNutrients(['calories', 'fat', 'carbohydrate', 'protein'])
  }

  changeCalories(calories: number) {
    this.currentValues.calories = calories;
    this.currentValues.amount = this.calculateAmountFromNutrition('calories')
    this.calculateNutrients(['fat', 'carbohydrate', 'protein'])
  }

  changeFat(fat: number) {
    this.currentValues.fat = fat;
    this.currentValues.amount = this.calculateAmountFromNutrition('fat')
    this.calculateNutrients(['calories', 'carbohydrate', 'protein'])
  }

  changeProtein(protein: number) {
    this.currentValues.protein = protein;
    this.currentValues.amount = this.calculateAmountFromNutrition('protein')
    this.calculateNutrients(['calories', 'carbohydrate', 'fat'])
  }

  changeCarbohydrate(carbohydrate: number) {
    this.currentValues.carbohydrate = carbohydrate;
    this.currentValues.amount = this.calculateAmountFromNutrition('carbohydrate')
    this.calculateNutrients(['calories', 'protein', 'fat'])
  }

  private calculateAmountFromNutrition(nutrition: string) {
    return Math.ceil(
      this.currentValues[nutrition]
      * this.baseValues.amount
      / this.baseValues[nutrition]
    )
  }

  private calculateNutrients(nutrients: string[]) {
    nutrients.map(nutrient => {
      this.currentValues[nutrient] =
        this.calculateNutritionFromAmount(nutrient)
    })
  }

  calculateNutritionFromAmount(nutrition: string) {
    return Math.ceil(
      this.currentValues.amount
      * this.baseValues[nutrition]
      / this.baseValues.amount
    )
  }
}

export default Food;
