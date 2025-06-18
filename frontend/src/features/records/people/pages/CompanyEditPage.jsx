import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getCompanyById, updateCompany } from "@/services/PeopleService";
import { Tab } from "@/components/templates/Tabs";
import { CompanyIcon } from "@/components/atoms/icons/CompanyIcon";
import { LoadingIcon } from "@/components/atoms/icons/LoadingIcon";
import { FormFooter } from "@/components/organisms/Footer";
import { FormBuilder } from "@/components/organisms/FormBuilder";
import { ConfirmModal } from "@/components/molecules/ConfirmModal";

const CompanyEditPage = () => {
  // Array com as informações principais para criar os inputs do formulário
  const inputs = [
    {
      name: "companyName",
      type: "default",
      label: "Razão Social",
      required: "Razão Social é obrigatório",
      inputStyle: "w-60",
    },
    {
      name: "cnpj",
      type: "masked",
      label: "CNPJ",
      required: "CNPJ é obrigatório",
      placeholder: "Ex: 99.999.999/9999-99",
      mask: "00.000.000/0000-00",
    },
    {
      name: "tradeName",
      type: "default",
      label: "Nome Fantasia",
      inputStyle: "w-60",
    },
    {
      name: "doe",
      type: "default",
      type2: "date",
      label: "Data de Fundação",
      required: "Data de fundação é obrigatório",
    },
    {
      name: "municipalRegistration",
      type: "default",
      label: "Inscrição Municipal",
    },
    {
      name: "stateRegistration",
      type: "default",
      label: "Inscrição Estadual",
    },
    {
      name: "phone",
      type: "masked",
      label: "Telefone",
      mask: "(00) 0000-0000",
      placeholder: "Ex: (99) 9999-9999",
    },
    {
      name: "email",
      type: "default",
      type2: "email",
      label: "Email",
      inputStyle: "w-50",
    },
  ];

  // Hook para salvar o id para uma rota dinâmica
  const { id } = useParams();
  // Estado que controla as mudanças de trigger recebido pelo FormBuilder
  const [triggerValidation, setTriggerValidation] = useState(null);
  // Estado para controlar o modal de confirmação ao submeter o formulário
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  // Estado que alterna quais informações devem aparecer no modal
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [companyData, setCompanyData] = useState(null); // Estado para armazenar os dados que serão editados
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Busca os dados cadastrados no banco de dados para alterarmos
      const data = await getCompanyById(id);
      // Substitui todos os valores null por "" para o navegador não alertar campos undefined
      const normalizedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value ?? ""])
      );
      setCompanyData(normalizedData); // Salva os dados no estado
      console.log("Dados para edição: ", normalizedData);
    };
    fetchData();
  }, [id]);

  // Função que envia o formulário
  const handleSubmitCompany = async (companyData) => {
    setStatus("loading");
    try {
      await updateCompany(id, companyData);
      setStatus("success");
    } catch (error) {
      console.error("Erro ao atualizar: ", error);
      setStatus("error");
    }
  };

  return (
    <React.Fragment>
      <div className="w-8/10 min-h-[92dvh] mx-auto px-4 py-2 bg-stone-800 rounded-b border-b-2 border-x-2 border-stone-700">
        <h2 className="text-2xl font-bold text-neutral-50 mb-2">
          Editar Pessoa Jurídica
        </h2>
        {/** Abaixo há uma short-circuit evaluation. Varifica se a condição é verdadeira
         * para retornar o componente. Caso false, nada acontece
         */}
        {isConfirmOpen && (
          <ConfirmModal // Modal de confirmação que deve se sobrepor a página aoi clicar no botão de salvar
            status={status} // Modal vai usar para saber se deve apresentar o loading, idle ou error
            setConfirmOpen={setConfirmOpen}
            messages={{
              // Mensagens que o modal apresenta para cada status
              idle: "Deseja realmente enviar os dados?",
              loading: "Carregando...",
              success: "Cadastro atualizado!",
              error: "Erro!",
            }}
          />
        )}
        <Tab // Componente que apresenta os dados em uma tab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={[
            {
              icon: <CompanyIcon className="w-4 h-4" />, // Ícone da tab
              label: "Dados de empresa", // Descrição da tab
              // Conteúdo principal da tab
              content: (
                <React.Fragment>
                  {companyData ? (
                    <FormBuilder // Formulário a ser submetido
                      inputs={inputs} // Enviamos as informações de campos para o formulário montar os inputs
                      onSubmit={handleSubmitCompany} // Método que será chamado quando o formulário for submetido
                      // Abaixo, prop que recebe a função trigger para validação dos campos obrigatórios
                      // É uma callback usada pelo componente atual para buscar a função trigger do FormBuilder
                      // Com isso, podemos passar a função trigger para o footer usar, que abrirá o modal somente se o trigger for true
                      onTriggerReady={(trigger) =>
                        setTriggerValidation(() => trigger)
                      }
                      data={companyData}
                    />
                  ) : (
                    <div className="flex flex-col items-center p-2 rounded shadow-sm bg-stone-100">
                      <LoadingIcon />
                      <p>Carregando dados...</p>
                    </div>
                  )}
                </React.Fragment>
              ),
            },
          ]}
        />
      </div>
      <FormFooter // Rodapé flutuante
        setConfirmOpen={setConfirmOpen} // enviado para que o botão de salvar abra o modal
        onTrigger={triggerValidation} // Faz a validação dos campos obrigatórios antes de abrir o modal
        setStatus={setStatus} // Passado ao footer que poderá controlar o coneúdo exibido no modal
      />
    </React.Fragment>
  );
};

export default CompanyEditPage;
