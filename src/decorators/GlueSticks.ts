import { StationeryDecorator } from './StationeryDecorator';

/**
 * GlueSticks
 * Concrete decorator that adds glue sticks to the cart.
 */
export class GlueSticks extends StationeryDecorator {
  // Price of one glue stick in NZD
  private static readonly UNIT_PRICE = 25;

  // Cost so far plus the cost of the glue sticks
  getCost(): number {
    return this.wrappedItem.getCost() + GlueSticks.UNIT_PRICE * this.quantity;
  }

  // Items so far plus a line for the glue sticks
  getDescription(): string[] {
    return [...this.wrappedItem.getDescription(), `Glue Sticks - Quantity: ${this.quantity}`];
  }
}
