import { StationeryDecorator } from './StationeryDecorator';

/**
 * Pens
 * Concrete decorator that adds pens to the cart.
 */
export class Pens extends StationeryDecorator {
  // Price of one pen in NZD
  private static readonly UNIT_PRICE = 12;

  // Cost so far plus the cost of the pens
  getCost(): number {
    return this.wrappedItem.getCost() + Pens.UNIT_PRICE * this.quantity;
  }

  // Items so far plus a line for the pens
  getDescription(): string[] {
    return [...this.wrappedItem.getDescription(), `Pens - Quantity: ${this.quantity}`];
  }
}
