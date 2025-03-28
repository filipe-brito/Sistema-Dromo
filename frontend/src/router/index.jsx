import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const AppRouter = () => { // AppRouter é uma arrow function
    return ( // A função retorna um conjunto de rotas
        <Router> {/* Organiza o roteador (que define rotas na aplicação). É importado do react-router-dom */}
            <Routes> {/* Agrupamento de rotas que vamos definir */}
                <Route path='/login' element={<LoginPage />} /> {/* Definindo a rota "/login" que aponta para o componente LoginPage */}
            </Routes>
        </Router>
    );
};

export default AppRouter; // Exporta o componente AppRouter para ser utilizado em outros arquivos
