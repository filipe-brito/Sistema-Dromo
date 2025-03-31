import React from "react";
import { Link } from "react-router-dom"; // Usado para navegação entre telas

const Dashboard = () => {
  return (
    <div className="h-screen w-screen bg-gray-100">
      {/* Conteúdo da tela */}
      <main className="p-8">
        <h2 className="text-xl text-gray-800">Bem-vindo ao painel de controle!</h2>
        {/* Outros conteúdos da tela de entrada */}
      </main>
    </div>
  );
};

export default Dashboard;