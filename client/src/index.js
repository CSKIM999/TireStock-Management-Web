import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { globalTheme } from "./globalTheme";
import store from "./store";
import persistStore from "redux-persist/lib/persistStore";
import { PersistGate } from "redux-persist/integration/react";

export let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={globalTheme}>
    <CssBaseline />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>
);
