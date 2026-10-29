import { StationeryDecorator } from './StationeryDecorator';

/**
 * Sharpener
 * Concrete decorator that adds sharpeners to the cart.
 */
export class Sharpener extends StationeryDecorator {
  // Price of one sharpener in NZD
  private static readonly UNIT_PRICE = 18;

  // Cost so far plus the cost of the sharpeners
  getCost(): number {
    return this.wrappedItem.getCost() + Sharpener.UNIT_PRICE * this.quantity;
  }

  // Items so far plus a line for the sharpeners
  getDescription(): string[] {
    return [...this.wrappedItem.getDescription(), `Sharpener - Quantity: ${this.quantity}`];
  }
}
