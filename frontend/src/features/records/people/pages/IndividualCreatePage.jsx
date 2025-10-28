import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FormBuilder } from "@/components/organisms/FormBuilder";
import { Tab2 } from "@/components/templates/Tabs";
import { PersonIcon } from "@/components/atoms/icons/PersonIcon";
import { postIndividual } from "@features/records/people/services/PeopleService";
import { FormFooter } from "@/components/organisms/Footer";
import { ConfirmModal } from "@/components/molecules/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { IndividualInputs } from "./PeopleInputs";
import { buildFormData } from "@/utils/miscellaneous";
import { sanitizeFormData } from "@/utils/sanitize";
import { FetchAddressByZipCode } from "@/services/UtilsService";
import { DriverIcon } from "../../../../components/atoms/icons/PersonIcon";

const IndividualCreatePage = () => {
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
    reset, // Função que reseta o formulário
    getValues,
  } = useForm(); // Hook do React para formulários

  // Monitora o valor das checkboxes de occupations para mostrar ou esconder
  // os inputs dos formulários correspondentes
  const [isDriver] = useWatch({ control, name: ["occupations.driver"] });

  const driverTab = isDriver
    ? [
        {
          icon: <DriverIcon className="w-16 h-16" />, // Ícone da tab
          label: "Dados de motorista", // Descrição da tab
          content: (
            <div className="flex flex-col gap-y-1">
              <section className="bg-stone-100 p-2 rounded">
                <h1 className="font-bold text-2xl mb-2 text-neutral-800">
                  Dados de motorista
                </h1>
                <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 items-end">
                  <FormBuilder
                    inputs={IndividualInputs.driver}
                    control={control}
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                  />
                </div>
              </section>
            </div>
          ),
        },
      ]
    : [];

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
                  ...currentValues.addresses?.[0],
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

  // Função que envia o formulário
  const handleSubmitIndividual = async (data) => {
    setStatus("loading"); // Altera o state para rodar o loading enquanto a função não retorna os dados
    // Sempre envolver requisições em um bloco try-catch
    let dataToSubmit;
    try {
      if (data.imageFile && data.imageFile[0]) {
        const individualData = { ...sanitizeFormData(data) };
        delete individualData.profileImageUrl;
        delete individualData.imageFile;

        dataToSubmit = buildFormData(
          "individual",
          individualData,
          "profile_image",
          data.imageFile[0]
        );
      } else {
        dataToSubmit = sanitizeFormData(data);
      }
      if (!dataToSubmit.occupations.driver) {
        delete dataToSubmit.driver;
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
        <form
          id="save" // Vincula o onSubmit em qualquer elemente que tenha esse mesmo id
          onSubmit={handleSubmit(handleSubmitIndividual)} // OI que deverá ser feito ao submeter o formulário
        >
          <Tab2 // Componente que apresenta os dados em uma tab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={[
              {
                icon: <PersonIcon className="w-16 h-16" />, // Ícone da tab
                label: "Dados pessoais", // Descrição da tab
                // Conteúdo principal da tab
                content: (
                  <div className="flex flex-col gap-y-1">
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
                        Ocupações
                      </h1>
                      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 items-end">
                        <FormBuilder
                          inputs={IndividualInputs.occupations}
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
                  </div>
                ),
              },
              ...driverTab,
            ]}
          />
        </form>
      </div>
      <FormFooter // Rodapé
        setConfirmOpen={setConfirmOpen} // enviado para que o botão de salvar abra o modal
        onTrigger={trigger} // Faz a validação dos campos obrigatórios antes de abrir o modal
        setStatus={setStatus} // Passado ao footer que poderá controlar o conteúdo exibido no modal
      />
    </React.Fragment>
  );
};

export default IndividualCreatePage;
