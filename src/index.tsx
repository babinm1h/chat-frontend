import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { socket, SocketContext } from "./context/socketContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketContext.Provider>
  </Provider>
);
