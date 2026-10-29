import type { IStationeryItem } from '../interfaces/IStationeryItem';

/**
 * EmptyCart
 * The starting object of the cart before any item is added.
 * In the Decorator pattern this is the "Concrete Component" that gets wrapped.
 */
export class EmptyCart implements IStationeryItem {
  // An empty cart costs nothing
  getCost(): number {
    return 0;
  }

  // An empty cart has no items to list
  getDescription(): string[] {
    return [];
  }
}
