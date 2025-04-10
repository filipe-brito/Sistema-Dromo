import React, { useState, useEffect } from "react";
import FilterBar from "../../components/molecules/FilterBar";
import ResultBar from "../../components/molecules/ResultBar";
import { PersonIcon } from "../../components/icons/PersonIcon";
import { CompanyIcon } from "../../components/icons/CompanyIcon";
import { fetchIndividuals } from "../../services/IndividualService";
import { Tab } from "../../components/organisms/Tabs";

const PeopleRecords = () => {
  const [data, setData] = useState([]); // Estado para armazenar os dados reais
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  // Lista de filtros (personalizável!)
  const filters = [
    { name: "name", placeholder: "Nome", type: "text" },
    { name: "cpf", placeholder: "CPF", type: "text" },
    { name: "cnpj", placeholder: "CNPJ", type: "text" },
  ];

  // Colunas da barra de resultados
  const columns = [
    { key: "name", label: "Nome" },
    { key: "cpf", label: "CPF/CNPJ" },
    { key: "email", label: "email" },
  ];

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

  // 🔹 Componente interno da aba de Pessoa Física
  const IndividualSection = () => (
    <>
      <div className="flex p-2 rounded shadow-sm bg-stone-100">
        <FilterBar filters={filters} />
      </div>
      <div className="flex p-2 mt-1 rounded border-stone-700 shadow-sm bg-stone-100">
        {loading ? (
          <p>Carregando registros...</p>
        ) : (
          <ResultBar columns={columns} data={data} />
        )}
      </div>
    </>
  );

  // 🔹 Placeholder para Pessoa Jurídica
  const CompanySection = () => (
    <div className="bg-stone-100 p-4 rounded text-neutral-800">
      Página de cadastro de empresas em construção...
    </div>
  );

  return (
    <div className="w-8/10 min-h-[92dvh] mx-auto px-4 py-2 bg-stone-800 border-x-2 border-stone-700">
      <h2 className="text-2xl font-bold text-neutral-50 mb-2">
        Cadastro de Pessoas
      </h2>

      {/* Tabs com abas de PF e PJ */}
      <Tab
        defaultTab={0}
        tabs={[
          {
            icon: <PersonIcon className="w-4 h-4" />,
            label: "Pessoa Física",
            content: <IndividualSection />,
          },
          {
            icon: <CompanyIcon className="w-4 h-4" />,
            label: "Pessoa Jurídica",
            content: <CompanySection />,
          },
        ]}
      />
    </div>
  );
};

export default PeopleRecords;
