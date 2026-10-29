# Weekly Checkpoint 3: Stationery Shopping Cart

A React and TypeScript (Vite) web app for a stationery shop. The customer ticks the items they want, picks a quantity for each one and clicks **Display Total Cost** to see the total. The total is worked out using the **Decorator design pattern**.

## Items and prices (NZD)

| Item | Price |
|---|---|
| Exercise Book | 30 |
| Pens | 12 |
| Pencils | 10 |
| Sharpener | 18 |
| Glue Sticks | 25 |

## How the Decorator pattern is used

* `IStationeryItem` is the common interface. It declares `getCost()` and `getDescription()`.
* `EmptyCart` is the starting object and costs 0.
* `StationeryDecorator` is the abstract decorator that wraps another item.
* `ExerciseBooks`, `Pens`, `Pencils`, `Sharpener` and `GlueSticks` each wrap the cart and add their own price times the quantity.
* `ShoppingCart` is the UI class. It wraps an empty cart with one decorator for every ticked item and asks the result for its total cost.

## Project structure

```
src
├── components
│   ├── ShoppingCart.tsx
│   └── ShoppingCart.css
├── decorators
│   ├── StationeryDecorator.ts
│   ├── ExerciseBooks.ts
│   ├── Pens.ts
│   ├── Pencils.ts
│   ├── Sharpener.ts
│   └── GlueSticks.ts
├── interfaces
│   └── IStationeryItem.ts
├── models
│   └── EmptyCart.ts
├── App.tsx
├── index.css
└── main.tsx
```

## Running the project

```
npm install
npm run dev
```

Then open http://localhost:5173 in the browser.

## Example

Selecting all five items with quantities 1, 2, 3, 4 and 5 gives a total of NZD 281.00.
