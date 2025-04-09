import React, { useState, useEffect, } from "react";
import FilterBar from "../components/organisms/FilterBar"
import ResultBar from "../components/organisms/ResultBar";
import { fetchIndividuals } from "../services/IndividualService";

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

  const [data, setData] = useState([]);      // Estado para armazenar os dados reais
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    // Função assíncrona para buscar os dados
    const loadData = async () => {
      try {
        const individuals = await fetchIndividuals(); // Chama a função que busca dados da API
        setData(individuals); // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false); // Indica que o carregamento terminou (sucesso ou erro)
      }
    };
  
    loadData();
  }, []); // Array de dependências vazio: executa só uma vez quando o componente é montado

  return (
    <div className="w-8/10 h-screen mx-auto p-4 bg-stone-300 shadow-lg shadow-stone-400">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Cadastro de Pessoas</h2>

      {/*Aplicando componente de filtro*/}
      <div className="flex p-2 rounded shadow-sm bg-stone-100">
        <FilterBar filters={filters} onSearch={handleSearch} />
      </div>
      <div className="flex p-2 mt-1 rounded border-stone-700 shadow-sm bg-stone-100">
      {loading ? <p>Carregando registros...</p> : <ResultBar columns={columns} data={data} />}
      </div>

      {/* Teste: Exibindo os valores digitados nos filtros */}
      <pre className="mt-1 text-neutral-800 bg-stone-100 p-4 rounded">{JSON.stringify(searchParams, null, 2)}</pre>
    </div>
  );
};

export default RecordsPage;