import { shoppingListReducer } from "./App";

test("addItem", () => {
  const initalState = [
    { quantity: 2, name: "book" },
    { quantity: 1, name: "bike" },
    { quantity: 4, name: "beer" }
  ];

  const newState = shoppingListReducer(initalState, {
    type: "addItem",
    itemName: "book",
    itemQuantity: 3
  });

  expect(newState[0].name).toBe("book");
  expect(newState[0].quantity).toBe(2 + 3);
});
