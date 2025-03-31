import React, { useState } from "react";

const CadastroPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envio do cadastro, como validar os dados ou enviar para o backend
    console.log("Cadastro enviado:", { name, email, password });
  };

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Cadastro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700">Nome</label>
          <input
            id="name"
            type="text"
            className="w-full p-3 border rounded-md text-gray-800"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            className="w-full p-3 border rounded-md text-gray-800"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700">Senha</label>
          <input
            id="password"
            type="password"
            className="w-full p-3 border rounded-md text-gray-800"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroPage;