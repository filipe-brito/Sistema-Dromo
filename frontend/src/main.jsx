import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App /> {/* Agora renderizamos o AppRouter, que contém as rotas */}
  </React.StrictMode>
);
