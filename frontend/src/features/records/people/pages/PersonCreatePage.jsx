import React, { useState } from "react";
import { FormBuilder } from "@/components/organisms/FormBuilder";
import { Tab } from "@/components/templates/Tabs";
import { PersonIcon } from "@/components/atoms/icons/PersonIcon";
import { useForm, Controller } from "react-hook-form";

const PersonCreatePage = () => {
  const {
    register, // função que registra o campo no formulário
    // handleSSubmit função que lida com o envio do formulário.
    // Ela vai validar se os campos foram preenchidos devidamente antes de chamar uma requisição ao BD
    handleSubmit,
    control, // função que registra os campos que não são nativos (inputs)
    // formState é objeto com os erros de validação. A chave seria o nome do campo e o valor seria a mensagem a ser apresentada
    // caso o usuário tente submeter o formulário com algum campo obrigatório vazio
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Função principal que define a ação ao submeter o formulário
    console.log("Dados enviados:", data);
  };

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
      options: [{ value: "Masculino" }, { value: "Feminino" }],
      inputStyle: "w-25",
    },
    {
      name: "marital_status",
      type: "select",
      label: "Estado civil",
      options: [{ value: "Solteiro" }, { value: "Casado" }],
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
      name: "Data de nascimento",
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

  return (
    <React.Fragment>
      <div className="w-8/10 min-h-[92dvh] mx-auto px-4 py-2 bg-stone-800 border-x-2 border-stone-700">
        <h2 className="text-2xl font-bold text-neutral-50 mb-2">
          Editar Pessoa Física
        </h2>
        <Tab
          defaultTab={0}
          tabs={[
            {
              icon: <PersonIcon className="w-4 h-4" />,
              label: "Dados pessoais",
              content: (
                <React.Fragment>
                  <FormBuilder inputs={inputs} onSubmit={onSubmit} />
                  <button
                    form="save"
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded fixed right-30 bottom-5"
                  >
                    Salvar
                  </button>
                </React.Fragment>
              ),
            },
          ]}
        />
      </div>
    </React.Fragment>
  );
};

export default PersonCreatePage;
