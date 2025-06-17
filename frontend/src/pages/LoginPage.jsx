import React, { useContext, useState } from "react"; // Importa o React que vai gerenciar esse componente. Importa o hook "useStage"
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const LoginPage = () => {
  // No React, criamos componentes (ou páginas) usando arrow functions.
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState(""); // Definimos um hook  useState para uma variável "email"
  const [password, setPassword] = useState(""); // Definimos um hook useState para uma variável "password"
  const [error, setError] = useState("");
  /*
  Essa é a sintaxe para definir um hook no React. Tomemos o "email" como exemplo
  const: define que a váriável email é imutável
  [email, setEmail]: email é o nome da variável e setEmail é o método usado para alterar o valor de email
  = useState(""): atribuímos o useState à essa variável e definimos uma String vazia como valor inicial 
  */

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // arrow funciton que será chamado por um button
    e.preventDefault(); // evita que o recarregamento da página quando o evento que chama essa função ocorrer
    try {
      const response = await api.post("/auth/login", { email, password });

      const { user, token } = response.data; // enviado pelo backend
      login(user, token); // Salva no Contexto e no localStorage

      // Redirecionar
      navigate("/home");
    } catch {
      console.error("Erro no login: ", error);
      setError("E-mail ou senha inválidos");
    }
  };

  return (
    // Padrão do React para definir um componente. Deve-se retornar um JSX
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <div className="flex justify-center">
          <img src="/images/gamer-logo.png" alt="Login" className="w-30" />
        </div>

        <h2 className="text-center text-3xl font-bold text-gray-800 mt-4">
          Acesse o seu Dromo!
        </h2>

        <form className="mt-6" onSubmit={handleSubmit}>
          {" "}
          {/* Cria um formulário e define o evento de submissão para ele*/}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <div className="relative">
              <input
                type="email"
                className="w-full p-3 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute right-3 top-3 text-gray-500">
                <i className="fa fa-envelope"></i>
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full p-3 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
