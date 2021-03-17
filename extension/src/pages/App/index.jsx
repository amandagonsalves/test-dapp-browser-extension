import React from "react";
import App from "./App.jsx";
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { Store } from 'webext-redux';

const store = new Store();

// const middleware = [thunkMiddleware];
// const storeWithMiddleware = applyMiddleware(store, ...middleware);

// const app = (
//   <Provider store={storeWithMiddleware}>
//     <App />
//   </Provider>
// );

store.ready().then(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
    , window.document.querySelector(".app-container"));
});

if (module.hot) module.hot.accept();