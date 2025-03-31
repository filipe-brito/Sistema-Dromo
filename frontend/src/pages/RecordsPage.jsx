import React, { useState } from "react";
import FilterBar from "../components/FilterBar"

const RecordsPage = () => {
  const [searchParams, setSearchParams] = useState({});

  // Função chamada quando o usuário digita nos campos
  const handleSearch = (name, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [name]: value, // Atualiza o filtro correspondente

    }));
  };

  // Lista de filtros (personalizável!)
  const filters = [
    {name: "name", placeholder: "Nome", type: "text"},
    {name: "cpf", placeholder: "CPF", type: "text"},
    {name: "cnpj", placeholder: "CNPJ", type: "text"},
  ];

    return (
    <div className="w-8/10 h-screen mx-auto p-8 bg-stone-300 shadow-lg shadow-stone-400">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Cadastro de Pessoas</h2>

      {/*Aplicando componente de filtro*/}
      <FilterBar filters={filters} onSearch={handleSearch} />

      {/* Teste: Exibindo os valores digitados nos filtros */}
      <pre className="mt-4 text-neutral-800 bg-stone-100 p-4 rounded">{JSON.stringify(searchParams, null, 2)}</pre>
    </div>
  );
};

export default RecordsPage;