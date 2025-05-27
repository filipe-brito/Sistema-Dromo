import React, { useState } from "react";
import { FormBuilder } from "@/components/organisms/FormBuilder";
import { Tab } from "@/components/templates/Tabs";
import { PersonIcon } from "@/components/atoms/icons/PersonIcon";
import { postIndividual } from "@/services/PeopleService";
import { FormFooter } from "@/components/organisms/Footer";
import { ConfirmModal } from "@/components/molecules/ConfirmModal";

const IndividualCreatePage = () => {
  // Array com as informações principais para criar os inputs do formulário
  const inputs = [
    {
      name: "name",
      type: "default",
      label: "Nome",
      required: "Nome é obrigatório",
    },
    {
      name: "cpf",
      type: "masked",
      label: "CPF",
      required: "CPF é obrigatório",
      mask: "000.000.000-00",
      placeholder: "Ex: 999.999.999-99",
    },
    {
      name: "gender",
      type: "select",
      label: "Sexo",
      required: "Sexo é obrigatório",
      options: [
        { optionLabel: "masculino", value: "M" },
        { optionLabel: "feminina", value: "F" },
      ],
      inputStyle: "w-25",
    },
    {
      name: "marital_status",
      type: "select",
      label: "Estado civil",
      options: [
        { optionLabel: "Solteiro", value: "solteiro" },
        { optionLabel: "Casado", value: "casado" },
      ],
      inputStyle: "w-25",
    },
    {
      name: "telefone",
      type: "masked",
      label: "Telefone",
      mask: "(00) 0000-0000",
      placeholder: "Ex: (99) 9999-9999",
    },
    {
      name: "cellphone",
      type: "masked",
      label: "Celular",
      mask: "(00) 0 0000-0000",
      placeholder: "Ex: (99) 9 9999-9999",
    },
    {
      name: "dob",
      type: "default",
      type2: "date",
      label: "Data de nascimento",
      required: "Data de nascimento é obrigatório",
      inputStyle: "w-30",
    },
    {
      name: "rg",
      type: "default",
      label: "RG",
      inputStyle: "w-30",
    },
    {
      name: "rntrc",
      type: "default",
      label: "RNTRC",
      inputStyle: "2-30",
    },
    {
      name: "email",
      type: "default",
      type2: "email",
      label: "Email",
      inputStyle: "w-50",
    },
  ];

  // Estado que controla as mudanças de trigger recebido pelo FormBuilder
  const [triggerValidation, setTriggerValidation] = useState(null);
  // Estado para controlar o modal de confirmação ao submeter o formulário
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  // Estado que alterna quais informações devem aparecer no modal
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  // Função que envia o formulário
  const handleSubmitIndividual = async (data) => {
    setStatus("loading"); // Altera o state para roda o loading enquanto a função não retorna os dados
    // Sempre envolver requisições em um bloco try-catch
    try {
      await postIndividual(data); // Método de chamada à API do backend
      setStatus("success"); // Se não houver erro no envio, altera o status para success
    } catch (error) {
      // Captura erros da requisição
      // Captura qualquer retorno de erro
      console.error("erro ao buscar pessoas físicas: ", error); // Imprime o erro no console
      setStatus("error");
    }
  };

  return (
    <React.Fragment>
      <div className="w-8/10 min-h-[92dvh] mx-auto px-4 py-2 bg-stone-800 border-x-2 border-stone-700">
        <h2 className="text-2xl font-bold text-neutral-50 mb-2">
          Nova Pessoa Física
        </h2>
        {/* Abaixo há uma short-circuit evaluation. Verifica se a condição é verdadeira para retornar o componente
        / Caso false, não acontece nada
        */}
        {isConfirmOpen && (
          <ConfirmModal // Modal de confirmação que deve se sobrepor a página ao clicar no botão de salvar
            status={status} // Modal vai usar para saber se deve apresentar o loading, o idle ou error
            setConfirmOpen={setConfirmOpen} // Modal usa para fechar ele mesmo depois da operação concluída
            messages={{
              // Mensagens que o modal apresenta para cada status
              idle: "Deseja realmente enviar os dados?",
              loading: "Carregando...",
              success: "Cadastro realizado",
              error: "Erro!",
            }}
          />
        )}
        <Tab // Componente que apresenta os dados em uma tab
          defaultTab={0}
          tabs={[
            {
              icon: <PersonIcon className="w-4 h-4" />, // Ícone da tab
              label: "Dados pessoais", // Descrição da tab
              // Conteúdo principal da tab
              content: (
                <React.Fragment>
                  <FormBuilder // Formulário a ser submetido
                    inputs={inputs} // Enviamos as informações de campos para o formulário montar os inputs
                    onSubmit={handleSubmitIndividual} // Método que será chamado quando o formulário for submetido
                    onTriggerReady={(
                      trigger // Prop que aplica a validação dos campos obrigatórios
                    ) => setTriggerValidation(() => trigger)}
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
        setStatus={setStatus} //
      />
    </React.Fragment>
  );
};

export default IndividualCreatePage;
