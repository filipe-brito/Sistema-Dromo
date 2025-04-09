import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import RecordsPage from "../pages/RecordsPage";
import MainLayout from "../layouts/MainLayout";

const AppRouter = () => {
  // AppRouter é uma arrow function
  return (
    // A função retorna um conjunto de rotas
    <Router>
      {/* Organiza o roteador (que define rotas na aplicação). É importado do react-router-dom */}
      <Routes>
        {/* Agrupamento de rotas que vamos definir */}
        <Route path="/login" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          {/* Definindo a rota "/login" que aponta para o componente LoginPage */}
          <Route path="/home" element={<DashboardPage />} />
          {/* Definindo a rota "/home" que aponta para o componente DashboardPage */}
          <Route path="/records" element={<RecordsPage />} />
          {/* Definindo a rota "/records" que aponta para o componente RecordsPage */}
          {/* Outras rotas desse layout */}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter; // Exporta o componente AppRouter para ser utilizado em outros arquivos
