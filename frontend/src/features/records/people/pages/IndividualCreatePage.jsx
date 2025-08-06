import React, { useState } from "react";
import { FormBuilder } from "@/components/organisms/FormBuilder";
import { Tab } from "@/components/templates/Tabs";
import { PersonIcon } from "@/components/atoms/icons/PersonIcon";
import { postIndividual } from "@features/records/people/services/PeopleService";
import { FormFooter } from "@/components/organisms/Footer";
import { ConfirmModal } from "@/components/molecules/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { IndividualInputs } from "./PeopleInputs";
import { buildFormData } from "../../../../utils/miscellaneous";

const IndividualCreatePage = () => {
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
  const handleSubmitIndividual = async (data) => {
    setStatus("loading"); // Altera o state para rodar o loading enquanto a função não retorna os dados
    // Sempre envolver requisições em um bloco try-catch

    let dataToSubmit = data;
    try {
      if (data.imageFile && data.imageFile[0]) {
        const individualData = { ...data };
        delete individualData.profileImageUrl;
        delete individualData.imageFile;

        dataToSubmit = buildFormData(
          "individual",
          individualData,
          "profile_image",
          data.imageFile[0]
        );
      }
      const response = await postIndividual(dataToSubmit); // Método de chamada à API do backend
      setStatus("success"); // Se não houver erro no envio, altera o status para success
      setTimeout(
        () => navigate(`/records/individual/edit/${response.id}`),
        3000
      ); // Redireciona para a edição do novo registro
    } catch (error) {
      // Captura erros da requisição
      setModalResponse(error.message);
      setStatus("error"); // Modal de confirmação apresenta o erro
    }
  };

  return (
    <React.Fragment>
      <div className="w-8/10 min-h-[92dvh] mx-auto px-4 py-2 bg-stone-800 border-x-2 border-b-2 rounded-b border-stone-700">
        <h2 className="text-2xl font-bold text-neutral-50 mb-2">
          Nova Pessoa Física
        </h2>
        {/** Abaixo há uma short-circuit evaluation. Varifica se a condição é verdadeira
         * para retornar o componente. Caso false, nada acontece
         */}
        {isConfirmOpen && (
          <ConfirmModal // Modal de confirmação que deve se sobrepor a página ao clicar no botão de salvar
            status={status} // Modal vai usar para saber se deve apresentar o loading, idle ou error
            setConfirmOpen={setConfirmOpen} // Modal usa para fechar ele mesmo depois da operação concluída
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
              icon: <PersonIcon className="w-4 h-4" />, // Ícone da tab
              label: "Dados pessoais", // Descrição da tab
              // Conteúdo principal da tab
              content: (
                <React.Fragment>
                  <FormBuilder // Formulário a ser submetido
                    inputs={IndividualInputs} // Enviamos as informações de campos para o formulário montar os inputs
                    onSubmit={handleSubmitIndividual} // Método que será chamado quando o formulário for submetido
                    // Abaixo, prop que recebe a função trigger para validação dos campos obrigatórios
                    // É uma callback usada pelo componente atual para buscar a função trigger do FormBuilder
                    // Com isso, podemos passar a função trigger para o footer usar, que abrirá o modal somente se trigger for true
                    onTriggerReady={(trigger) =>
                      setTriggerValidation(() => trigger)
                    }
                  />
                </React.Fragment>
              ),
            },
          ]}
        />
      </div>
      <FormFooter // Rodapé
        setConfirmOpen={setConfirmOpen} // enviado para que o botão de salvar abra o modal
        onTrigger={triggerValidation} // Faz a validação dos campos obrigatórios antes de abrir o modal
        setStatus={setStatus} // Passado ao footer que poderá controlar o conteúdo exibido no modal
      />
    </React.Fragment>
  );
};

export default IndividualCreatePage;
