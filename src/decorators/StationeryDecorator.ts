import type { IStationeryItem } from '../interfaces/IStationeryItem';

/**
 * StationeryDecorator
 * Abstract parent class for every stationery item.
 * It wraps another IStationeryItem so items can be stacked on top of each other.
 * In the Decorator pattern this is the "Decorator".
 */
export abstract class StationeryDecorator implements IStationeryItem {
  // The cart or item that this decorator wraps
  protected readonly wrappedItem: IStationeryItem;

  // How many of this item the customer selected
  protected readonly quantity: number;

  constructor(wrappedItem: IStationeryItem, quantity: number) {
    this.wrappedItem = wrappedItem;
    this.quantity = quantity;
  }

  // Each item class must add its own cost to the wrapped cost
  abstract getCost(): number;

  // Each item class must add its own line to the wrapped description
  abstract getDescription(): string[];
}
