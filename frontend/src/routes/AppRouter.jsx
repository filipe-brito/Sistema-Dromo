import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import PeopleRecords from "../features/records/people/pages/PeopleRecords";
import MainLayout from "../layouts/MainLayout";
import TestPage from "../pages/TestPage";
import IndividualCreatePage from "../features/records/people/pages/IndividualCreatePage";
import IndividualEditPage from "../features/records/people/pages/IndividualEditPage";
import CompanyCreatePage from "../features/records/people/pages/CompanyCreatePage";
import CompanyEditPage from "../features/records/people/pages/CompanyEditPage";
import PrivateRoute from "./PrivateRoute";

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
        <Route path="/teste" element={<TestPage />} />

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            {/* Definindo a rota "/home" que aponta para o componente DashboardPage */}
            <Route path="/home" element={<DashboardPage />} />
            {/* Definindo a rota "/records" que aponta para o componente RecordsPage */}
            <Route path="/records/people" element={<PeopleRecords />} />
            <Route
              path="/records/individual/create"
              element={<IndividualCreatePage />}
            />
            <Route
              path="/records/company/create"
              element={<CompanyCreatePage />}
            />
            <Route
              path="/records/individual/edit/:id"
              element={<IndividualEditPage />}
            />
            <Route
              path="/records/company/edit/:id"
              element={<CompanyEditPage />}
            />
            {/* Outras rotas desse layout */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter; // Exporta o componente AppRouter para ser utilizado em outros arquivos
