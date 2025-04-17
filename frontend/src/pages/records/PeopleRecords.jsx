import { PersonIcon } from "../../components/icons/PersonIcon";
import { CompanyIcon } from "../../components/icons/CompanyIcon";
import { fetchCompanies, fetchIndividuals } from "../../services/PeopleService";
import { Tab } from "../../components/organisms/Tabs";
import { SearchSection } from "../../components/templates/SearchSection";

import React, { useState, useEffect } from "react";

const PeopleRecords = () => {
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  // Dados e filtros de pessoas físicas
  const [individualData, setIndividualData] = useState([]);
  const [companyData, setCompanyData] = useState([]);

  const handleSearchIndividuals = async (filters = {}) => {
    setLoading(true);
    try {
      const result = await fetchIndividuals(filters); // envia os filtros se tiver
      setIndividualData(result);
    } catch (error) {
      console.error("erro ao buscar pessoas físicas: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchCompanies = async (filters = {}) => {
    setLoading(true);
    try {
      const result = await fetchCompanies(filters);
    } catch (error) {
      console.log("Erro ao buscar empresas: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearchIndividuals();
    handleSearchCompanies();
  }, []);

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
    { key: "companyName", label: "Razão Social" },
    { key: "cnpj", label: "CNPJ" },
  ];

  // 🔹 Componente interno da aba de Pessoa Física
  const IndividualSection = () => (
    <SearchSection
      filters={individualFilters}
      columns={individualColumns}
      data={individualData}
      loading={loading}
      onSearch={handleSearchIndividuals}
    />
  );

  // 🔹 Componente interno da aba de Pessoa jurídica
  const CompanySection = () => (
    <SearchSection
      filters={companyFilters}
      columns={companyColumns}
      data={companyData}
      loading={loading}
      onSearch={handleSearchCompanies}
    />
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
