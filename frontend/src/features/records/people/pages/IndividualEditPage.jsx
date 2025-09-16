import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  getIndividualById,
  updateIndividual,
} from "@features/records/people/services/PeopleService";
import React, { useState } from "react";
import { FormBuilder } from "@/components/organisms/FormBuilder";
import { Tab } from "@/components/templates/Tabs";
import { PersonIcon } from "@/components/atoms/icons/PersonIcon";
import { FormFooter } from "@/components/organisms/Footer";
import { ConfirmModal } from "@/components/molecules/ConfirmModal";
import { LoadingIcon } from "../../../../components/atoms/icons/LoadingIcon";
import { IndividualInputs } from "./PeopleInputs";
import { sanitizeFormData } from "../../../../utils/sanitize";
import { FetchAddressByZipCode } from "../../../../services/UtilsService";
import { buildFormData } from "../../../../utils/miscellaneous";
import { useForm } from "react-hook-form";
import { validators } from "../../../../utils/validators";

const IndividualEditPage = () => {
  const { id } = useParams();

  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [modalResponse, setModalResponse] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [individualData, setIndividualData] = useState(null); // Estado novo para armazenar dados
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
    getValues,
  } = useForm(); // Hook do React para formulários

  useEffect(() => {
    const fetchData = async () => {
      // Busca os dados cadastrados no banco de dados para alterarmos
      const data = await getIndividualById(id);
      // Substitui todos os valores null por "" para o navegador não alertar campos undefined
      const normalizedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value ?? ""])
      );
      setIndividualData(normalizedData); // Salva os dados no estado
    };
    fetchData();
  }, [id]);

  // Monitora o valor de CEP e busca o endereço automaticamente
  const watchCep = watch("addresses[0].zipCode");
  useEffect(() => {
    /**
     * Para que o efeito não substitua os dados que o usuário já tinha preenchido,
     * verificamos se algum dos campos já tem valor. Se tiver, saímos do effect
     * sem executar o método de busca de endereço.
     */
    if (
      !!watch("addresses[0].street") ||
      !!watch("addresses[0].neighborhood") ||
      !!watch("addresses[0].city")
    ) {
      return;
    }
    // Abaixo, apenas criamos a função que vai buscar o endereço
    const fetchAndSet = async () => {
      // Limpa o CEP para ficar apenas com números
      const cepLimpo = watchCep ? watchCep.replace(/\D/g, "") : "";
      if (cepLimpo.length !== 8) {
        // Sai do effect se o CEP não tiver 8 dígitos
        return;
      }

      try {
        // Vamos chamar a API que retorna o endereço com base no CEP
        const address = await FetchAddressByZipCode(cepLimpo);

        // Se encontrar o endereço, preenche os campos do formulário
        if (address) {
          const currentValues = getValues();
          reset(
            {
              // O reset vai agir no formulário todo, então precisamos manter os valores atuais com o spread
              ...currentValues,
              addresses: [
                {
                  ...currentValues.addresses?.[0], // mantém os valores atuais do address[0], se houver
                  street: address.street,
                  neighborhood: address.neighborhood,
                  city: address.city,
                },
              ],
            },
            /**
             * Por padrão, o reset substitui todo o formulário indicado (addresses),
             * então precisamos manter os valores que o usuário já tinha preenchido
             * e os erros de validação.
             * Para isso usamos essas opções:
             * keepErrors: true -> mantém os erros de validação já apresentados
             * keepDirty: true -> mantém os valores que o usuário já tinha preenchido
             */
            { keepErrors: true, keepDirty: true }
          );
        }
      } catch (err) {
        console.warn("Erro ao buscar endereço:", err);
        // opcional: setError('addresses[0].zipCode', { type: 'manual', message: 'CEP não encontrado' })
      }
    };

    // Abaixo, executamos a função que criamos acima
    fetchAndSet();
  }, [watchCep]);

  const handleSubmitIndividual = async (individualData) => {
    setStatus("loading");
    let dataToSubmit;
    try {
      if (individualData.imageFile && individualData.imageFile[0]) {
        const individualJson = { ...sanitizeFormData(individualData) };
        delete individualJson.profileImageUrl;
        delete individualJson.imageFile;
        dataToSubmit = buildFormData(
          "individual",
          individualJson,
          "profile_image",
          individualData.imageFile[0]
        );
      } else {
        dataToSubmit = sanitizeFormData(individualData);
      }
      await updateIndividual(id, dataToSubmit);
      setStatus("success");
    } catch (error) {
      setModalResponse(error.message);
      setStatus("error");
    }
  };

  // Efeito colateral que envia os dados ao reset quando `data` for fornecida (edição)
  useEffect(() => {
    // Abaixo, condicional que verifica se a prop data é true
    if (individualData) {
      // Aplica máscaras se existir um validador com .mask
      // A máscara não é aplicada no reset, o que quebra o validate.
      // Vamos formatar os dados antes de inserí-los nos campos
      // Object.entries converte objects em array de pares [chave, valor]
      // .reduce itera todos os pares e junta tudo em um novo object (acc)
      // Para cada iteração, o .reduce aplica a máscara ao par
      const formattedData = Object.entries(individualData).reduce(
        (acc, [key, value]) => {
          const mask = validators[key]?.mask;
          acc[key] = mask ? mask(value) : value;

          return acc;
        },
        {}
      );

      // Executa o reset com os dados como argumento. O reset vai preencher os campos do formulário automaticamente
      // Retornamos o object reformatado pelo redux. Agora, o validate passa normalmente
      reset(formattedData);
    }
    // "Sempre declare todas as dependências que você usa dentro do efeito."
  }, [individualData, reset]); // As dependências garantem que o reset será feito sempre que data e reset mudarem

  return (
    <React.Fragment>
      <div className="w-8/10 min-h-[92dvh] mx-auto px-4 py-2 bg-stone-800 rounded-b border-b-2 border-x-2 border-stone-700">
        <h2 className="text-2xl font-bold text-neutral-50 mb-2">
          Editar Pessoa Física
        </h2>
        {isConfirmOpen && (
          <ConfirmModal
            status={status}
            setStatus={setStatus}
            setConfirmOpen={setConfirmOpen}
            messages={{
              idle: "Deseja realmente enviar os dados?",
              loading: "Carregando...",
              success: "Cadastro atualizado!",
              error: modalResponse,
            }}
          />
        )}
        <Tab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={[
            {
              icon: <PersonIcon className="w-4 h-4" />,
              label: "Dados pessoais",
              content: (
                <React.Fragment>
                  {individualData ? (
                    <form
                      id="save" // Vincula o onSubmit em qualquer elemente que tenha esse mesmo id
                      onSubmit={handleSubmit(handleSubmitIndividual)} // OI que deverá ser feito ao submeter o formulário
                      className="flex flex-col rounded shadow-sm  gap-y-1"
                    >
                      <section className="bg-stone-100 p-2 rounded">
                        <h1 className="font-bold text-2xl mb-2 text-neutral-800">
                          Dados principais
                        </h1>
                        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 items-end">
                          <FormBuilder
                            inputs={IndividualInputs.mainData}
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
                          Endereços
                        </h1>
                        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 items-end">
                          <FormBuilder
                            inputs={IndividualInputs.addresses}
                            control={control}
                            register={register}
                            errors={errors}
                            watch={watch}
                            setValue={setValue}
                            validateGroup={true}
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
      <FormFooter
        setConfirmOpen={setConfirmOpen}
        onTrigger={trigger}
        setStatus={setStatus}
      />
    </React.Fragment>
  );
};

export default IndividualEditPage;
