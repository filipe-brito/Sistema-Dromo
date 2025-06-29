import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App /> {/* Agora renderizamos o AppRouter, que contém as rotas */}
    </AuthProvider>
  </React.StrictMode>
);
