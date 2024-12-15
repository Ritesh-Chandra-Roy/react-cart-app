import React, { useReducer, useState } from "react";
import "./App.css";

// Reducer function for cart state management
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProduct = state.find((item) => item.id === action.payload.id);
      if (existingProduct) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    case "INCREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case "DECREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
};

const CartPage = () => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
  ];

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={`cart-container ${darkMode ? "dark-mode" : ""}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <h1 className="heading">Shopping Cart</h1>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <span className="product-name">{product.name}</span>
            <span className="product-price">${product.price}</span>
            <button
              className="add-to-cart-btn"
              onClick={() =>
                dispatch({ type: "ADD_TO_CART", payload: product })
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span className="cart-item-name">{item.name}</span>
              <span className="cart-item-details">
                ${item.price} x {item.quantity}
              </span>
              <div className="cart-actions">
                <button
                  className="quantity-btn"
                  onClick={() =>
                    dispatch({ type: "INCREASE_QUANTITY", payload: item })
                  }
                >
                  +
                </button>
                <button
                  className="quantity-btn"
                  onClick={() =>
                    dispatch({ type: "DECREASE_QUANTITY", payload: item })
                  }
                >
                  -
                </button>
                <button
                  className="remove-btn"
                  onClick={() =>
                    dispatch({ type: "REMOVE_FROM_CART", payload: item })
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="total-amount">Total: ${totalAmount}</p>
    </div>
  );
};

export default CartPage;
