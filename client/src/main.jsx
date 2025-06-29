// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./redux/store"; //
import { ToastContainer } from "react-toastify"; 
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
           <ToastContainer position="top-right" autoClose={2000} />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
