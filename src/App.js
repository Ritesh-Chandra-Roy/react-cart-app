import React, { useReducer } from "react";
import { Box, Card, Button } from '@mui/material';
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

const CartPage = ({ isDarkMode, toggleDarkMode }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
  ];

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button variant="outlined" onClick={toggleDarkMode}
        sx={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 10,
        }}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </Button>
      <h1 className="heading">Shopping Cart</h1>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4}}>
      <Card sx={{ display: 'flex', flexDirection: 'column', height: 'max-content', gap: 4}}>
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <span className="product-name">{product.name}</span>
            <span className="product-price">${product.price}</span>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                dispatch({ type: "ADD_TO_CART", payload: product })
              }>
              Add to Cart
            </Button>
          </div>
        ))}
      </Card>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <Card sx={{ display: 'flex', flexDirection: 'column', gap: 4}}>
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
                    item.quantity > 1 ? dispatch({ type: "DECREASE_QUANTITY", payload: item }) :
                      dispatch({ type: "REMOVE_FROM_CART", payload: item })
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
          <div className="amount-wrapper"><p className="total-amount">Total: ${totalAmount}</p></div>
        </Card>
      )}
      </Box>

    </Box>
  );
};

export default CartPage;
