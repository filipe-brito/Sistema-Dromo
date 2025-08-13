import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab } from "@/components/templates/Tabs";
import { postCompany } from "@features/records/people/services/PeopleService";
import { ConfirmModal } from "@/components/molecules/ConfirmModal";
import { FormFooter } from "@/components/organisms/Footer";
import { CompanyIcon } from "@/components/atoms/icons/CompanyIcon";
import { FormBuilder } from "@/components/organisms/FormBuilder";
import { companyInputs } from "./PeopleInputs";
import { sanitizeFormData } from "../../../../utils/sanitize";
import { buildFormData } from "../../../../utils/miscellaneous";

const CompanyCreatePage = () => {
  // Estado que armazena a função trigger do FormBuilder
  const [triggerValidation, setTriggerValidation] = useState(null);
  // Estado para controlar o modal de confirmação ao submeter o formulário
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [modalResponse, setModalResponse] = useState(null);
  // Estado que alterna quais informações devem aparecer no modal
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [activeTab, setActiveTab] = useState(0);

  const navigate = useNavigate(); // Hook para direcionar para outras páginas

  // Função que envia o formulário
  const handleSubmitCompany = async (data) => {
    setStatus("loading"); // Altera o state para rodar o loading enquanto a função não retorna os dados
    // Sempre envolver requisições em um bloco try-catch

    // Vamos modificar os dados. Então,
    let dataToSubmit;
    try {
      if (data.imageFile && data.imageFile[0]) {
        const companyData = { ...sanitizeFormData(data) };
        delete companyData.profileImageUrl;
        delete companyData.imageFile;

        dataToSubmit = buildFormData(
          "company",
          companyData,
          "profile_image",
          data.imageFile[0]
        );
      } else {
        dataToSubmit = sanitizeFormData(data);
      }
      const response = await postCompany(dataToSubmit); // Método de chamada à API do backend
      setStatus("success"); // Se não houver erro no envio, altera o status para success
      setTimeout(() => navigate(`/records/company/edit/${response.id}`), 3000); // Redireciona para a edição do novo registro
    } catch (error) {
      // Captura erros da requisição
      setModalResponse(error.message);
      setStatus("error"); // Modal de confirmação apresenta o erro
    }
  };

  return (
    <React.Fragment>
      <div className="w-8/10 min-h-[92dvh] mx-auto px-4 py-2 bg-stone-800 rounded-b border-b-2 border-x-2 border-stone-700">
        <h2 className="text-2xl font-bold text-neutral-50 mb-2">
          Nova Pessoa Jurídica
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
              success: "Cadastro realizado",
              error: modalResponse,
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
                  <FormBuilder // Formulário a ser submetido
                    inputs={companyInputs} // Enviamos as informações de campos para o formulário montar os inputs
                    onSubmit={handleSubmitCompany} // Método que será chamado quando o formulário for submetido
                    // Abaixo, prop que recebe a função trigger para validação dos campos obrigatórios
                    // É uma callback usada pelo componente atual para buscar a função trigger do FormBuilder
                    // Com isso, podemos passar a função trigger para o footer usar, que abrirá o modal somente se o trigger for true
                    onTriggerReady={(trigger) =>
                      setTriggerValidation(() => trigger)
                    }
                    formStyle="grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 items-end"
                  />
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

export default CompanyCreatePage;
