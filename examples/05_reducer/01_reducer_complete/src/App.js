import produce from "immer";
import { useReducer, useState } from "react";

const initalState = [
  { quantity: 2, name: "book" },
  { quantity: 1, name: "bike" },
  { quantity: 4, name: "beer" }
];

export function shoppingListReducer(state, action) {
  return produce(state, newState => {
    switch (action.type) {
      case "addItem": {
        if (isNaN(action.itemQuantity) || action.itemQuantity < 1) {
          return;
        }
        let currentItem = newState.find(item => item.name === action.itemName);
        if (currentItem) {
          currentItem.quantity += parseInt(action.itemQuantity);
        } else {
          currentItem = {
            quantity: action.itemQuantity,
            name: action.itemName
          };
          newState.push(currentItem);
        }
        break;
      }
      case "updateName":
        if (action.newName) {
          let currentItem = newState.find(item => item.name === action.oldName);
          if (currentItem) {
            currentItem.name = action.newName;
          }
        }
        break;
      default:
        throw new Error("Invalid action " + action);
    }
  });
}

export default function App() {
  const [items, dispatch] = useReducer(shoppingListReducer, initalState);
  return (
    <div>
      <h1>Shopping List 🛍</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <ItemRow key={item.name} item={item} dispatch={dispatch} />
          ))}
          <AddItemRow dispatch={dispatch} />
        </tbody>
      </table>
    </div>
  );
}

function AddItemRow({ dispatch }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  function handleAdd() {
    dispatch({
      type: "addItem",
      itemName: name,
      itemQuantity: parseInt(quantity)
    });
  }
  return (
    <tr>
      <td>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </td>
      <td>
        <input type="text" value={quantity} onChange={e => setQuantity(e.target.value)} />
      </td>
      <td>
        <button style={{ width: "100%" }} onClick={handleAdd}>
          Add
        </button>
      </td>
    </tr>
  );
}

function ItemRow({ item, dispatch }) {
  const [newName, setNewName] = useState("");

  function handleNameChange() {
    dispatch({
      type: "updateName",
      oldName: item.name,
      newName
    });
  }

  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
      <td>
        <div className="Flex">
          <input type="text" onChange={e => setNewName(e.target.value)} value={newName} />
          <button onClick={handleNameChange}>Change Name</button>
        </div>
      </td>
    </tr>
  );
}
