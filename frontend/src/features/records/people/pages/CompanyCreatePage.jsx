import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
  // Estado para controlar o modal de confirmação ao submeter o formulário
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [modalResponse, setModalResponse] = useState(null);
  // Estado que alterna quais informações devem aparecer no modal
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [activeTab, setActiveTab] = useState(0);

  const navigate = useNavigate(); // Hook para direcionar para outras páginas

  const {
    register, // estado que registra o inputs comuns no formulário
    // handleSubmit função que lida com o envio do formulário.
    handleSubmit,
    control, // estado que registra os campos que não são nativos (inputs)
    // O reset preenche os campos com os dados enviados pelo comnponente de edição de cadastro
    reset,
    // formState é objeto com os erros de validação.
    // A chave seria o nome do campo e o valor seria a mensagem a ser apresentada caso trigger retornar false
    formState: { errors },
    // Controla a validação dos campos. Caso true chama handleSubmit,
    // caso false exibe os erros de formState acima dos campos
    trigger,
    // Função que monitora os campos do formulário
    watch,
    // Função para alterar o valor de um campo programaticamente
    setValue,
  } = useForm(); // Hook do React para formulários

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
                <form
                  id="save" // Vincula o onSubmit em qualquer elemente que tenha esse mesmo id
                  onSubmit={handleSubmit(handleSubmitCompany)} // OI que deverá ser feito ao submeter o formulário
                  className="flex flex-col rounded shadow-sm  gap-y-1"
                >
                  <section className="bg-stone-100 p-2 rounded">
                    <h1 className="font-bold text-2xl mb-2 text-neutral-800">
                      Dados principais
                    </h1>
                    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 items-end">
                      <FormBuilder
                        inputs={companyInputs.mainData}
                        control={control}
                        register={register}
                        errors={errors}
                        watch={watch}
                        setValue={setValue}
                      />
                    </div>
                  </section>
                  <section className="bg-stone-100 p-2 rounded">
                    <h1 className="font-bold text-2xl mb-2 text-neutral-800">
                      Endereço
                    </h1>
                    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 items-end">
                      <FormBuilder
                        inputs={companyInputs.addresses}
                        control={control}
                        register={register}
                        errors={errors}
                        watch={watch}
                        setValue={setValue}
                      />
                    </div>
                  </section>
                </form>
              ),
            },
          ]}
        />
      </div>
      <FormFooter // Rodapé flutuante
        setConfirmOpen={setConfirmOpen} // enviado para que o botão de salvar abra o modal
        onTrigger={trigger} // Faz a validação dos campos obrigatórios antes de abrir o modal
        setStatus={setStatus} // Passado ao footer que poderá controlar o coneúdo exibido no modal
      />
    </React.Fragment>
  );
};

export default CompanyCreatePage;
