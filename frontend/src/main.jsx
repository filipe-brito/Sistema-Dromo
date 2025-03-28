import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router"; // Aqui importamos o AppRouter

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AppRouter /> {/* Agora renderizamos o AppRouter, que contém as rotas */}
  </React.StrictMode>
);
