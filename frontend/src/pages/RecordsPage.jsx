import React, { useState } from "react";
import FilterBar from "../components/FilterBar"
import ResultBar from "../components/ResultBar";

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

  // Colunas da barra de resultados
  const columns = [
    {key: "name", label: "Nome"},
    {key: "cpf", label: "CPF/CNPJ"},
    {key: "email", label: "email"},
  ]

  // Teste simulado de retorno de BD
  const mockResults = [
    { name: "João da Silva", cpf: "123.456.789-00", email: "joao@email.com" },
    { name: "Maria Souza", cpf: "987.654.321-00", email: "maria@email.com" },
    { name: "Empresa XYZ", cpf: "12.345.678/0001-99", email: "contato@xyz.com.br" },
    { name: "João da Silva", cpf: "123.456.789-00", email: "joao@email.com" },
    { name: "Maria Souza", cpf: "987.654.321-00", email: "maria@email.com" },
    { name: "Empresa XYZ", cpf: "12.345.678/0001-99", email: "contato@xyz.com.br" },
    { name: "João da Silva", cpf: "123.456.789-00", email: "joao@email.com" },
    { name: "Maria Souza", cpf: "987.654.321-00", email: "maria@email.com" },
    { name: "Empresa XYZ", cpf: "12.345.678/0001-99", email: "contato@xyz.com.br" },
    { name: "João da Silva", cpf: "123.456.789-00", email: "joao@email.com" },
    { name: "Maria Souza", cpf: "987.654.321-00", email: "maria@email.com" },
    { name: "Empresa XYZ", cpf: "12.345.678/0001-99", email: "contato@xyz.com.br" },
    { name: "João da Silva", cpf: "123.456.789-00", email: "joao@email.com" },
    { name: "Maria Souza", cpf: "987.654.321-00", email: "maria@email.com" },
    { name: "Empresa XYZ", cpf: "12.345.678/0001-99", email: "contato@xyz.com.br" },
    { name: "João da Silva", cpf: "123.456.789-00", email: "joao@email.com" },
    { name: "Maria Souza", cpf: "987.654.321-00", email: "maria@email.com" },
    { name: "Empresa XYZ", cpf: "12.345.678/0001-99", email: "contato@xyz.com.br" },
    { name: "João da Silva", cpf: "123.456.789-00", email: "joao@email.com" },
    { name: "Maria Souza", cpf: "987.654.321-00", email: "maria@email.com" },
    { name: "Empresa XYZ", cpf: "12.345.678/0001-99", email: "contato@xyz.com.br" },
    { name: "João da Silva", cpf: "123.456.789-00", email: "joao@email.com" },
    { name: "Maria Souza", cpf: "987.654.321-00", email: "maria@email.com" },
    { name: "Empresa XYZ", cpf: "12.345.678/0001-99", email: "contato@xyz.com.br" },
    { name: "João da Silva", cpf: "123.456.789-00", email: "joao@email.com" },
    { name: "Maria Souza", cpf: "987.654.321-00", email: "maria@email.com" },
    { name: "Empresa XYZ", cpf: "12.345.678/0001-99", email: "contato@xyz.com.br" },
    { name: "João da Silva", cpf: "123.456.789-00", email: "joao@email.com" },
    { name: "Maria Souza", cpf: "987.654.321-00", email: "maria@email.com" },
    { name: "Empresa XYZ", cpf: "12.345.678/0001-99", email: "contato@xyz.com.br" },
    { name: "João da Silva", cpf: "123.456.789-00", email: "joao@email.com" },
    { name: "Maria Souza", cpf: "987.654.321-00", email: "maria@email.com" },
    { name: "Empresa XYZ", cpf: "12.345.678/0001-99", email: "contato@xyz.com.br" },
    { name: "João da Silva", cpf: "123.456.789-00", email: "joao@email.com" },
    { name: "Maria Souza", cpf: "987.654.321-00", email: "maria@email.com" },
    { name: "Empresa XYZ", cpf: "12.345.678/0001-99", email: "contato@xyz.com.br" },
    { name: "João da Silva", cpf: "123.456.789-00", email: "joao@email.com" },
    { name: "Maria Souza", cpf: "987.654.321-00", email: "maria@email.com" },
    { name: "Empresa XYZ", cpf: "12.345.678/0001-99", email: "contato@xyz.com.br" },
    { name: "João da Silva", cpf: "123.456.789-00", email: "joao@email.com" },
    { name: "Maria Souza", cpf: "987.654.321-00", email: "maria@email.com" },
    { name: "Empresa XYZ", cpf: "12.345.678/0001-99", email: "contato@xyz.com.br" },
    { name: "João da Silva", cpf: "123.456.789-00", email: "joao@email.com" },
    { name: "Maria Souza", cpf: "987.654.321-00", email: "maria@email.com" },
    { name: "Empresa XYZ", cpf: "12.345.678/0001-99", email: "contato@xyz.com.br" },
  ];

    return (
    <div className="w-8/10 h-screen mx-auto p-4 bg-stone-300 shadow-lg shadow-stone-400">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Cadastro de Pessoas</h2>

      {/*Aplicando componente de filtro*/}
      <div className="flex p-2 rounded shadow-sm bg-stone-100">
        <FilterBar filters={filters} onSearch={handleSearch} />
      </div>
      <div className="flex p-2 mt-1 rounded border-stone-700 shadow-sm bg-stone-100">
        <ResultBar columns={columns} data={mockResults} />
      </div>

      {/* Teste: Exibindo os valores digitados nos filtros */}
      <pre className="mt-1 text-neutral-800 bg-stone-100 p-4 rounded">{JSON.stringify(searchParams, null, 2)}</pre>
    </div>
  );
};

export default RecordsPage;