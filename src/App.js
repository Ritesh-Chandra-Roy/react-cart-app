import React, { useReducer } from "react";
import { Box, Card, CardContent, CardActions, Button, Typography, IconButton } from '@mui/material';
import { AddBox, RemoveCircle, Delete } from '@mui/icons-material';
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
      <Typography variant="h3" align="center">Shopping Cart</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 'max-content', gap: 4 }}>
          {products.map((product) => (
            <Card key={product.id} className="product-item">
              <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>{product.name}</Typography>
                <Typography>${product.price}</Typography>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      dispatch({ type: "ADD_TO_CART", payload: product })
                    }>
                    Add to Cart
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          ))}
        </Box>

        {cart.length === 0 ? (
          <Typography variant="body1" color="text.secondary">Your cart is empty!</Typography>
        ) : (
          <Card sx={{ display: 'flex', flexDirection: 'column', gap: 4, height: 'max-content' }}>
            <CardContent>
              {cart.map((item) => (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ padding: 2 }} variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">${item.price} x {item.quantity}</Typography>
                  <Box>
                    <IconButton
                      onClick={() =>
                        dispatch({ type: "INCREASE_QUANTITY", payload: item })
                      }
                      color="primary"
                    >
                      <AddBox />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        item.quantity > 1 ? dispatch({ type: "DECREASE_QUANTITY", payload: item }) :
                          dispatch({ type: "REMOVE_FROM_CART", payload: item })
                      }
                      color="secondary"
                    >
                      <RemoveCircle />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: item })
                      }
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              ))}
              <Typography variant="body1" color="info" align="right">Total: ${totalAmount}</Typography>
            </CardContent>
          </Card>
        )}
      </Box>

    </Box>
  );
};

export default CartPage;
