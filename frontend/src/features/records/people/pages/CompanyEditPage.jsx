import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  getCompanyById,
  updateCompany,
} from "@features/records/people/services/PeopleService";
import { Tab } from "@/components/templates/Tabs";
import { CompanyIcon } from "@/components/atoms/icons/CompanyIcon";
import { LoadingIcon } from "@/components/atoms/icons/LoadingIcon";
import { FormFooter } from "@/components/organisms/Footer";
import { FormBuilder } from "@/components/organisms/FormBuilder";
import { ConfirmModal } from "@/components/molecules/ConfirmModal";
import { companyInputs } from "./PeopleInputs";
import { sanitizeFormData } from "../../../../utils/sanitize";
import { buildFormData } from "../../../../utils/miscellaneous";
import { useForm } from "react-hook-form";
import { validators } from "../../../../utils/validators";

const CompanyEditPage = () => {
  // Hook para salvar o id para uma rota dinâmica
  const { id } = useParams();
  // Estado para controlar o modal de confirmação ao submeter o formulário
  const [modalResponse, setModalResponse] = useState(null);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  // Estado que alterna quais informações devem aparecer no modal
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [companyData, setCompanyData] = useState(null); // Estado para armazenar os dados que serão editados
  const [activeTab, setActiveTab] = useState(0);

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

  useEffect(() => {
    const fetchData = async () => {
      // Busca os dados cadastrados no banco de dados para alterarmos
      const data = await getCompanyById(id);
      // Substitui todos os valores null por "" para o navegador não alertar campos undefined
      const normalizedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value ?? ""])
      );
      setCompanyData(normalizedData); // Salva os dados no estado
    };
    fetchData();
  }, [id]);

  // Função que envia o formulário
  const handleSubmitCompany = async (data) => {
    setStatus("loading");
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
      await updateCompany(id, dataToSubmit);
      setStatus("success");
    } catch (error) {
      setModalResponse(error.message);
      setStatus("error");
    }
  };

  // Efeito colateral que envia os dados ao reset quando `data` for fornecida (edição)
  useEffect(() => {
    // Abaixo, condicional que verifica se a prop data é true
    if (companyData) {
      // Aplica máscaras se existir um validador com .mask
      // A máscara não é aplicada no reset, o que quebra o validate.
      // Vamos formatar os dados antes de inserí-los nos campos
      // Object.entries converte objects em array de pares [chave, valor]
      // .reduce itera todos os pares e junta tudo em um novo object (acc)
      // Para cada iteração, o .reduce aplica a máscara ao par
      const formattedData = Object.entries(companyData).reduce(
        (acc, [key, value]) => {
          const mask = validators[key]?.mask;
          // 👇 Aqui você intercepta e reformata o campo específico
          if (key === "birthCity") {
            acc[key] = {
              value: value.id,
              label: value.cityAndState,
              ...value, // mantém ibgeCode, state, etc
            };
          } else {
            acc[key] = mask ? mask(value) : value;
          }
          return acc;
        },
        {}
      );

      // Executa o reset com os dados como argumento. O reset vai preencher os campos do formulário automaticamente
      // Retornamos o object reformatado pelo redux. Agora, o validate passa normalmente
      reset(formattedData);
    }
    // "Sempre declare todas as dependências que você usa dentro do efeito."
  }, [companyData, reset]); // As dependências garantem que o reset será feito sempre que data e reset mudarem

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
                  {companyData ? (
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
                            inputs={companyInputs}
                            control={control}
                            register={register}
                            errors={errors}
                            watch={watch}
                            setValue={setValue}
                          />
                        </div>
                      </section>
                    </form>
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
        onTrigger={trigger} // Faz a validação dos campos obrigatórios antes de abrir o modal
        setStatus={setStatus} // Passado ao footer que poderá controlar o coneúdo exibido no modal
      />
    </React.Fragment>
  );
};

export default CompanyEditPage;
