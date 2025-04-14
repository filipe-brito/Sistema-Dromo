import { PersonIcon } from "../../components/icons/PersonIcon";
import { CompanyIcon } from "../../components/icons/CompanyIcon";
import { fetchCompanies, fetchIndividuals } from "../../services/PeopleService";
import { Tab } from "../../components/organisms/Tabs";
import { SearchSection } from "../../components/organisms/SearchSection";

const PeopleRecords = () => {
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
    { key: "companyName", label: "Razão Social" },
    { key: "cnpj", label: "CNPJ" },
  ];

  // 🔹 Componente interno da aba de Pessoa Física
  const IndividualSection = () => (
    <SearchSection
      filters={individualFilters}
      columns={individualColumns}
      fetch={fetchIndividuals}
    />
  );

  // 🔹 Placeholder para Pessoa Jurídica
  const CompanySection = () => (
    <SearchSection
      filters={companyFilters}
      columns={companyColumns}
      fetch={fetchCompanies}
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
