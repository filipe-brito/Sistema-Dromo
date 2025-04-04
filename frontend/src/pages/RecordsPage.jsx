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
    <div className="w-8/10 h-screen mx-auto p-4 bg-stone-300 shadow-lg shadow-stone-400">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Cadastro de Pessoas</h2>

      {/*Aplicando componente de filtro*/}
      <div className="flex p-2 rounded shadow-sm bg-stone-100">
      <FilterBar filters={filters} onSearch={handleSearch} />
      </div>

      {/* Teste: Exibindo os valores digitados nos filtros */}
      <pre className="mt-2 text-neutral-800 bg-stone-100 p-4 rounded">{JSON.stringify(searchParams, null, 2)}</pre>
    </div>
  );
};

export default RecordsPage;