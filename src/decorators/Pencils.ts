import { StationeryDecorator } from './StationeryDecorator';

/**
 * Pencils
 * Concrete decorator that adds pencils to the cart.
 */
export class Pencils extends StationeryDecorator {
  // Price of one pencil in NZD
  private static readonly UNIT_PRICE = 10;

  // Cost so far plus the cost of the pencils
  getCost(): number {
    return this.wrappedItem.getCost() + Pencils.UNIT_PRICE * this.quantity;
  }

  // Items so far plus a line for the pencils
  getDescription(): string[] {
    return [...this.wrappedItem.getDescription(), `Pencils - Quantity: ${this.quantity}`];
  }
}
