import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import AuthContext from './authContext/authState';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContext>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthContext>
  </React.StrictMode>
);


