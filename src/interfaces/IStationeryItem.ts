/**
 * IStationeryItem
 * Common interface shared by the empty cart and every stationery item.
 * In the Decorator pattern this is the "Component" that all classes follow.
 */
export interface IStationeryItem {
  // Returns the total cost (NZD) of this item plus everything it wraps
  getCost(): number;

  // Returns one text line for every item that has been added to the cart
  getDescription(): string[];
}
