import { PersonIcon } from "@/components/atoms/icons/PersonIcon";
import { CompanyIcon } from "@/components/atoms/icons/CompanyIcon";
import {
  deleteIndividual,
  deleteCompany,
  fetchCompanies,
  fetchIndividuals,
} from "@features/records/people/services/PeopleService";
import { Tab } from "@/components/templates/Tabs";
import { SearchSection } from "@/components/organisms/SearchSection";
import { EditButton } from "@/components/atoms/EditButton";
import { DeleteButton } from "@/components/atoms/DeleteButton";
import { ConfirmModal } from "@/components/molecules/ConfirmModal";
import { useNavigate } from "react-router-dom"; // <--- Importa isso no topo

import React, { useState, useEffect } from "react";
import { NewFooter } from "../../../../components/organisms/Footer";

const PeopleRecords = () => {
  const [loading, setLoading] = useState(true); // Estado booleano para ativar ou desativar a telinha de carregamento
  // Dados e filtros de pessoas físicas
  const [individualData, setIndividualData] = useState({}); // Estado de array que armazena os dados de PF retornados pelo backend
  const [companyData, setCompanyData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null); // <-- Aqui você guarda o ID a ser deletado
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [activeTab, setActiveTab] = useState(0); // State para atualizar a guia ativa pelo index
  // Estados que controlam a página atual do sistema de paginação em ResultBar
  const [individualPage, setIndividualPage] = useState(0);
  const [companyPage, setCompanyPage] = useState(0);

  const [individualFilterValues, setIndividualFilterValues] = useState({});
  const [companyFilterValues, setCompanyFilterValues] = useState({});

  const handleSearchIndividuals = async (filters, page = 0) => {
    // Variável que recebe uma arrow function. É necessário passar um argumento do tipo object, caso não seja passado, a função considera filter um object vazio
    setLoading(true); // Altera o state setLoading para true quando necessário
    // Sempre envolver requisições em um bloco try-catch
    try {
      const result = await fetchIndividuals(filters, page); // Executa a chamada à API e guarda o retorno na variável result. Caso a função receba filters, enviamos os filters para a requisição
      setIndividualData(result); // Atribui ao state individualData o retorno da API guardado em result. Essa atualização vai causar um re-render em PeopleRecords inteiro
    } catch (error) {
      // Captura qualquer retorno de erro
      console.error("erro ao buscar pessoas físicas: ", error); // Imprime o erro no console
    } finally {
      // Esse bloco sempre será executado independente de erro ou não.
      setLoading(false); // Altera o loading para false
    }
  };
  useEffect(() => {
    handleSearchIndividuals(individualFilterValues, individualPage);
  }, [individualPage]);

  const handleSearchCompanies = async (filters, page = 0) => {
    setLoading(true);
    try {
      const result = await fetchCompanies(filters, page);
      setCompanyData(result);
    } catch (error) {
      console.log("Erro ao buscar empresas: ", error);
    }
  };
  useEffect(() => {
    handleSearchCompanies(companyFilterValues, companyPage);
  }, [companyPage]);

  useEffect(() => {
    if (individualData && companyData) {
      setLoading(false);
    }
  }, [individualData, companyData]);

  const openConfirmModal = (id) => {
    setSelectedItem(id);
    setConfirmOpen(true);
    setStatus("idle");
  };

  const handleDeleteIndividual = async (selectedItem) => {
    setStatus("loading"); // Altera o state setStatus para true quando necessário
    // Sempre envolver requisições em um bloco try-catch
    try {
      await deleteIndividual(selectedItem); // Executa a chamada à API e guarda o retorno na variável result. Caso a função receba filters, enviamos os filters para a requisição
      setStatus("success");
      // 🔁 Atualiza os dados da tabela após exclusão
      await handleSearchIndividuals(); // <-- aqui
    } catch (error) {
      // Captura qualquer retorno de erro
      console.error("erro ao deletar registro: ", error); // Imprime o erro no console
      setStatus("error");
    }
  };

  const handleDeleteCompany = async (selectedItem) => {
    setStatus("loading"); // Altera o state setStatus para true quando necessário
    // Sempre envolver requisições em um bloco try-catch
    try {
      await deleteCompany(selectedItem); // Executa a chamada à API e guarda o retorno na variável result. Caso a função receba filters, enviamos os filters para a requisição
      setStatus("success");
      // 🔁 Atualiza os dados da tabela após exclusão
      await handleSearchCompanies(); // <-- aqui
    } catch (error) {
      // Captura qualquer retorno de erro
      console.error("erro ao deletar registro: ", error); // Imprime o erro no console
      setStatus("error");
    }
  };

  useEffect(() => {
    // useEffect executa um código que não tem relação com a renderização da interface. No caso, chamadas a API, e por isso, é executado fora do return
    handleSearchIndividuals(); // Executa a chamada à API. Como não foi passado argumentos, fetchIndividuals será executado com filtros vazios
    handleSearchCompanies();
  }, []); // Os colchetes servem para definir o momento em que esse hook deve ser executado. Caso vazio, ele será executado após a primeira renderização do componente

  // Filtros pessoas físicas
  const individualFilters = [
    // Variável que guarda um array de objetos do tipo object. Esse array será enviado como prop para a barra de filtro da página. Cada object representa um filtro
    { name: "name", placeholder: "Nome", type: "text" }, // Filtro por nome. "name" é um atributo padrão para identificar um campo em um formulário
    {
      name: "cpf",
      placeholder: "CPF",
      masked: true, // Determina que esse campo terá uma máscara de digitação
      mask: "000.000.000-00", // Máscara que será usada pelo IMask no FilterBar
    }, // filtro por cpf
    { name: "email", placeholder: "email", type: "text" }, // filtro por email
  ];

  // Filtros pessoas jurídicas
  const companyFilters = [
    { name: "companyName", placeholder: "Razão Social", type: "text" },
    {
      name: "cnpj",
      masked: true,
      mask: "00.000.000/0000-00",
      placeholder: "CNPJ",
    },
  ];

  // Colunas da barra de resultados de pessoas físicas
  const individualColumns = [
    // Variável que guarda um array de objetos do tipo object que será passado como prop da barra de resultados. Cada object representa uma coluna indicando o tipo de dado apresentado
    { key: "name", label: "Nome" }, // key é uma chave que vamos usar para ordenar as colunas e label é um rótulo que será apresentado no título da tabela da barra de resultados
    {
      key: "cpf",
      label: "CPF",
      masked: true, // Determina que esse campo terá uma máscara de exibição
      formatter: (value) =>
        value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"), // Esse atributo enviará uma função anônima que formata a String usando Regex antes de exibir o conteúdo na ResultBar
    },
    { key: "email", label: "email" },
  ];

  // Colunas da barra de resultados de pessoas jurídicas
  const companyColumns = [
    { key: "companyName", label: "Razão Social" },
    {
      key: "cnpj",
      label: "CNPJ",
      masked: true,
      formatter: (value) =>
        value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"),
    },
  ];

  const navigate = useNavigate();

  const individualsActionsColumn = (id) => (
    <div className="flex items-center justify-center">
      <EditButton
        id={id}
        onClick={() => navigate(`/records/individual/edit/${id}`)}
      />
      <DeleteButton onClick={() => openConfirmModal(id)} />
    </div>
  );

  const companyActionsColumn = (id) => (
    <div className="flex items-center justify-center">
      <EditButton
        id={id}
        onClick={() => navigate(`/records/company/edit/${id}`)}
      />
      <DeleteButton onClick={() => openConfirmModal(id)} />
    </div>
  );

  return (
    <React.Fragment>
      <div className="w-8/10 min-h-[92dvh] mx-auto px-4 py-2 bg-stone-800 rounded-b border-x-2 border-b-2 border-stone-700">
        <h2 className="text-2xl font-bold text-neutral-50 mb-2">
          Cadastro de Pessoas
        </h2>
        {isConfirmOpen && (
          <ConfirmModal
            status={status}
            setStatus={setStatus}
            setConfirmOpen={setConfirmOpen}
            messages={{
              idle: "Deseja realmente excluir esse registro?",
              loading: "Excluindo...",
              success: "Registro excluído!",
              error: "Erro!",
            }}
            onConfirm={() => {
              if (activeTab === 0) {
                handleDeleteIndividual(selectedItem);
              } else if (activeTab === 1) {
                handleDeleteCompany(selectedItem);
              }
            }}
          />
        )}
        {/* Tabs com abas de PF e PJ */}
        <Tab // Componente reutilizável que criamos para gerenciar abas. Há duas props que precisamos passar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={[
            // Prop que passar um array de objects que representam as abas do componente. No caso, terá duas abas
            {
              icon: <PersonIcon className="w-4 h-4" />, // Componente de um ícone de pessoa física
              label: "Pessoa Física", // Rótulo que será exibido na aba para selecionar
              // Conteúdo principal da aba. No caso, uma SearchSection
              content: (
                <SearchSection // Componente que Criamos para uma sessão inteiro dedicada à pesquisa de dados.
                  filters={individualFilters} // Para montar o a barra de filtros, mandamos como prop o array de objects dos filtros Para que o SearchSection monte o FilterBar
                  columns={individualColumns} // Necessário para o SearchSection montar o ResultBar
                  data={individualData} // São os dados retornados pela api. Passamos para o SearchSection montar o ResultBar e apresentar os dados
                  actions={individualsActionsColumn}
                  loading={loading} // O ícone de loading será exibido na barra de resultados, então passamos esse state para o SearchSection passar para ResultBar
                  filterValues={individualFilterValues}
                  setFilterValues={setIndividualFilterValues}
                  page={individualPage}
                  setPage={setIndividualPage}
                  onSearch={handleSearchIndividuals} // Passamos essa prop para SearchSection passar para Filterbar passar para o botão. É a ação que será executada ao clicar no botão.
                />
              ),
            },
            {
              icon: <CompanyIcon className="w-4 h-4" />,
              label: "Pessoa Jurídica",
              content: (
                <SearchSection
                  filters={companyFilters}
                  columns={companyColumns}
                  data={companyData}
                  loading={loading}
                  filterValues={companyFilterValues}
                  setFilterValues={setCompanyFilterValues}
                  page={companyPage}
                  setPage={setCompanyPage}
                  onSearch={handleSearchCompanies}
                  actions={companyActionsColumn}
                />
              ),
            },
          ]}
        />
      </div>
      <NewFooter />
    </React.Fragment>
  );
};

export default PeopleRecords;
