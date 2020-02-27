import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "materialize-css";

import store from "./store";
import { Routes } from "./components/Routes";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
