import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CartPage from "./App";
import "./App.css";

const Index = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    const theme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CartPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </ThemeProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component
root.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>
);