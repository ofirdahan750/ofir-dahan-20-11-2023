import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { store } from "./store/store";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
        <ToastContainer />
      </BrowserRouter>
    </React.StrictMode>
  );
}
