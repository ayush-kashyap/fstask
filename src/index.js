import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material';
import theme from './theme/Theme'
import { UserContextProvider } from './ContextAPI/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserContextProvider>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </UserContextProvider>
);

