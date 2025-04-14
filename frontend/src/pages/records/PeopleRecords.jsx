import React, { useState, useEffect } from "react";
import FilterBar from "../../components/molecules/FilterBar";
import ResultBar from "../../components/molecules/ResultBar";
import { PersonIcon } from "../../components/icons/PersonIcon";
import { CompanyIcon } from "../../components/icons/CompanyIcon";
import { fetchIndividuals } from "../../services/IndividualService";
import { Tab } from "../../components/organisms/Tabs";
import { LoadingIcon } from "../../components/icons/LoadingIcon";

const PeopleRecords = () => {
  const [data, setData] = useState([]); // Estado para armazenar os dados reais
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  // Filtros pessoas físicas
  const individualFilters = [
    { name: "name", placeholder: "Nome", type: "text" },
    { name: "cpf", placeholder: "CPF", type: "text" },
    { name: "email", placeholder: "email", type: "text" },
  ];

  // Filtros pessoas jurídicas
  const companyFilters = [
    { name: "name", placeholder: "Razão Social", type: "text" },
    { name: "cnpj", placeholder: "CNPJ", type: "text" },
  ];

  // Colunas da barra de resultados de pessoas físicas
  const individualColumns = [
    { key: "name", label: "Nome" },
    { key: "cpf", label: "CPF" },
    { key: "email", label: "email" },
  ];

  // Colunas da barra de resultados de pessoas jurídicas
  const companyColumns = [
    { key: "name", label: "Razão Social" },
    { key: "cnpj", label: "CNPJ" },
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
        <FilterBar filters={individualFilters} />
      </div>
      <div className="flex p-2 mt-1 rounded border-stone-700 shadow-sm bg-stone-100">
        {loading ? (
          <div className="flex w-full justify-center">
            <LoadingIcon />
            <p>Carregando...</p>
          </div>
        ) : (
          <ResultBar columns={individualColumns} data={data} />
        )}
      </div>
    </>
  );

  // 🔹 Placeholder para Pessoa Jurídica
  const CompanySection = () => (
    <>
      <div className="flex p-2 rounded shadow-sm bg-stone-100">
        <FilterBar filters={companyFilters} />
      </div>
      <div className="flex p-2 mt-1 rounded border-stone-700 shadow-sm bg-stone-100">
        {loading ? (
          <div className="flex w-full justify-center">
            <LoadingIcon />
            <p>Carregando...</p>
          </div>
        ) : (
          <ResultBar columns={companyColumns} data={data} />
        )}
      </div>
    </>
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
