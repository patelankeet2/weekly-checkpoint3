import { StationeryDecorator } from './StationeryDecorator';

/**
 * ExerciseBooks
 * Concrete decorator that adds exercise books to the cart.
 */
export class ExerciseBooks extends StationeryDecorator {
  // Price of one exercise book in NZD
  private static readonly UNIT_PRICE = 30;

  // Cost so far plus the cost of the exercise books
  getCost(): number {
    return this.wrappedItem.getCost() + ExerciseBooks.UNIT_PRICE * this.quantity;
  }

  // Items so far plus a line for the exercise books
  getDescription(): string[] {
    return [...this.wrappedItem.getDescription(), `Exercise Book - Quantity: ${this.quantity}`];
  }
}
