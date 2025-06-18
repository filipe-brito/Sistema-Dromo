import { Navigate, Outlet } from "react-router-dom";

// Busca o token no localStorage
const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  if (!token) {
    /**
     * Se não tiver token a função será interrompida e a aplicação redireciona para /login
     * Quando o login é bem-sucedido, o React Router troca a rota no histórico,
     * como se a rota anterior nunca tivesse existido. */
    return <Navigate to="/login" replace />;
  }

  // Se tiver token, permite acessar a rota
  return <Outlet />;
};

export default PrivateRoute;
