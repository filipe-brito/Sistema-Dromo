import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import PeopleRecordsRoutes from "@features/records/people/routes/PeopleRecordsRoutes";

const AppRouter = () => {
  // AppRouter é uma arrow function
  return (
    // A função retorna um conjunto de rotas
    <Router>
      {/* Organiza o roteador (que define rotas na aplicação). É importado do react-router-dom */}
      <Routes>
        {/* Agrupamento de rotas que vamos definir */}

        {/* Definindo a rota "/login" que aponta para o componente LoginPage */}
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            {/* Definindo a rota "/home" que aponta para o componente DashboardPage */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<DashboardPage />} />
            {/* Definindo a rota "/records" que aponta para o componente RecordsPage */}
            <Route path="/records/*" element={<PeopleRecordsRoutes />} />
            {/* Outras rotas desse layout */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter; // Exporta o componente AppRouter para ser utilizado em outros arquivos
