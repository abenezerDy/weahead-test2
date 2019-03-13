import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import HomePage from "./js/containers/index";
import { Provider } from "mobx-react";
import ReportStore from "./store";
import { onPatch } from "mobx-state-tree";

import makeInspectable from "mobx-devtools-mst";

const store = ReportStore.create({});

onPatch(store, patch => {
  console.log(patch);
});
makeInspectable(store);

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <HomePage />
    </Provider>
  </ThemeProvider>
);

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
