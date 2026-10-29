import { Component, type ChangeEvent } from 'react';
import type { IStationeryItem } from '../interfaces/IStationeryItem';
import { EmptyCart } from '../models/EmptyCart';
import { ExerciseBooks } from '../decorators/ExerciseBooks';
import { Pens } from '../decorators/Pens';
import { Pencils } from '../decorators/Pencils';
import { Sharpener } from '../decorators/Sharpener';
import { GlueSticks } from '../decorators/GlueSticks';
import './ShoppingCart.css';

// Keys used to identify each stationery item in the state
type ItemKey = 'exerciseBooks' | 'pens' | 'pencils' | 'sharpener' | 'glueSticks';

// Details the UI needs to show one item and add it to the cart
interface StationeryOption {
  key: ItemKey;
  label: string;
  // Wraps the current cart with this item's decorator
  addToCart: (cart: IStationeryItem, quantity: number) => IStationeryItem;
}

// Whether an item is ticked and how many were chosen
interface ItemSelection {
  checked: boolean;
  quantity: number;
}

// Everything the ShoppingCart keeps in its state
interface ShoppingCartState {
  selections: Record<ItemKey, ItemSelection>;
  showTotal: boolean;
  selectedLines: string[];
  totalCost: number;
}

// List of items shown on the screen, in display order
const STATIONERY_OPTIONS: StationeryOption[] = [
  { key: 'exerciseBooks', label: 'Exercise Book', addToCart: (cart, qty) => new ExerciseBooks(cart, qty) },
  { key: 'pens', label: 'Pens', addToCart: (cart, qty) => new Pens(cart, qty) },
  { key: 'pencils', label: 'Pencils', addToCart: (cart, qty) => new Pencils(cart, qty) },
  { key: 'sharpener', label: 'Sharpener', addToCart: (cart, qty) => new Sharpener(cart, qty) },
  { key: 'glueSticks', label: 'Glue Sticks', addToCart: (cart, qty) => new GlueSticks(cart, qty) },
];

// Quantities offered in each drop down (1 to 10)
const QUANTITY_OPTIONS: number[] = Array.from({ length: 10 }, (_, index) => index + 1);

// Title shown in the browser tab while the cart is open
const PAGE_TITLE = 'Stationery Shopping Cart';

// Shows a number as a price, for example 281 becomes "NZD 281.00"
const formatPrice = (amount: number): string => `NZD ${amount.toFixed(2)}`;

// Gets the price of one item by asking its decorator for the cost of 1
const getUnitPrice = (option: StationeryOption): number =>
  option.addToCart(new EmptyCart(), 1).getCost();

/**
 * ShoppingCart
 * UI class that shows the stationery items with checkboxes and quantity drop downs.
 * It builds the cart using the decorator classes to work out the total cost.
 */
class ShoppingCart extends Component<object, ShoppingCartState> {
  // Title of the page before this component was shown
  private previousTitle = '';

  constructor(props: object) {
    super(props);

    // Start with every item unticked and a quantity of 1
    const selections = {} as Record<ItemKey, ItemSelection>;
    STATIONERY_OPTIONS.forEach((option) => {
      selections[option.key] = { checked: false, quantity: 1 };
    });

    this.state = { selections, showTotal: false, selectedLines: [], totalCost: 0 };
  }

  // Lifecycle: runs once after the component first appears on the page
  componentDidMount(): void {
    this.previousTitle = document.title;
    document.title = PAGE_TITLE;
  }

  // Lifecycle: runs after every update, keeps the total in sync with the selection
  componentDidUpdate(_prevProps: object, prevState: ShoppingCartState): void {
    const selectionChanged = prevState.selections !== this.state.selections;

    // Only recalculate once the total is showing and the selection has changed
    if (this.state.showTotal && selectionChanged) {
      this.updateTotal();
    }
  }

  // Lifecycle: runs just before the component is removed, puts the old title back
  componentWillUnmount(): void {
    document.title = this.previousTitle;
  }

  // Builds the cart by wrapping an empty cart with a decorator for each ticked item
  private buildCart(): IStationeryItem {
    let cart: IStationeryItem = new EmptyCart();

    STATIONERY_OPTIONS.forEach((option) => {
      const selection = this.state.selections[option.key];
      if (selection.checked) {
        cart = option.addToCart(cart, selection.quantity);
      }
    });

    return cart;
  }

  // Asks the decorated cart for its cost and item list, then saves them in the state
  private updateTotal(): void {
    const cart = this.buildCart();
    this.setState({ selectedLines: cart.getDescription(), totalCost: cart.getCost() });
  }

  // Ticks or unticks an item
  private handleCheckboxChange = (key: ItemKey, event: ChangeEvent<HTMLInputElement>): void => {
    const checked = event.target.checked;
    this.setState((state) => ({
      selections: { ...state.selections, [key]: { ...state.selections[key], checked } },
    }));
  };

  // Changes the quantity chosen for an item
  private handleQuantityChange = (key: ItemKey, event: ChangeEvent<HTMLSelectElement>): void => {
    const quantity = Number(event.target.value);
    this.setState((state) => ({
      selections: { ...state.selections, [key]: { ...state.selections[key], quantity } },
    }));
  };

  // Shows the selected items and the total cost when the button is clicked
  private handleDisplayClick = (): void => {
    this.setState({ showTotal: true });
    this.updateTotal();
  };

  // Draws the summary card on the right (or below on small screens)
  private renderSummary() {
    const { showTotal, selectedLines, totalCost } = this.state;

    // Before the button is clicked, show a short hint instead of a total
    if (!showTotal) {
      return <p className="summary-hint">Select your items and click Display Total Cost to see your order.</p>;
    }

    return (
      <>
        {selectedLines.length === 0 ? (
          <p className="summary-hint">No items selected.</p>
        ) : (
          <ul className="summary-list">
            {selectedLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}

        <div className="summary-total">
          <span>Total Cost is :</span>
          <span className="summary-amount">{formatPrice(totalCost)}</span>
        </div>
      </>
    );
  }

  render() {
    const { selections } = this.state;

    return (
      <div className="cart-page">
        {/* Page heading */}
        <header className="cart-header">
          <h1>Shopping Cart Example</h1>
          <p>Stationery Shop: tick the items you need and choose a quantity.</p>
        </header>

        <div className="cart-layout">
          {/* Item selection card */}
          <section className="card">
            <h2 className="card-title">Stationery Items</h2>

            {/* Column headings for the item list */}
            <div className="item-row item-heading">
              <span>Item</span>
              <span>Price</span>
              <span>Qty</span>
            </div>

            {/* One row per item: checkbox, name, price and quantity drop down */}
            {STATIONERY_OPTIONS.map((option) => {
              const selection = selections[option.key];
              return (
                <div className={`item-row${selection.checked ? ' is-selected' : ''}`} key={option.key}>
                  <label className="item-name" htmlFor={option.key}>
                    <input
                      type="checkbox"
                      id={option.key}
                      checked={selection.checked}
                      onChange={(event) => this.handleCheckboxChange(option.key, event)}
                    />
                    {option.label}
                  </label>
                  <span className="item-price">{formatPrice(getUnitPrice(option))}</span>
                  <select
                    aria-label={`${option.label} quantity`}
                    value={selection.quantity}
                    onChange={(event) => this.handleQuantityChange(option.key, event)}
                  >
                    {QUANTITY_OPTIONS.map((quantity) => (
                      <option key={quantity} value={quantity}>
                        {quantity}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}

            <button type="button" className="display-button" onClick={this.handleDisplayClick}>
              Display Total Cost
            </button>
          </section>

          {/* Order summary card, updates live after the button is clicked */}
          <section className="card summary-card" aria-live="polite">
            <h2 className="card-title">Selected Items:</h2>
            {this.renderSummary()}
          </section>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
