import React, { useState } from "react";
import { FormBuilder } from "../components/organisms/FormBuilder";
import { Tab } from "../components/templates/Tabs";
import { PersonIcon } from "../components/atoms/icons/PersonIcon";
import { MaskedInput } from "../components/atoms/Input";
import { useForm, Controller } from "react-hook-form";
import { validators } from "../utils/validators";

const TestPage = () => {
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
    { name: "cpf", label: "CPF", mask: "000.000.000-00" },
    { name: "cnpj", label: "CNPJ", mask: "00.000.000/0000-00" },
    {
      name: "telefone",
      label: "Telefone",
      mask: "(00)0000-0000",
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
                  <div className="flex-col" key={inputs[1].name}>
                    {errors[inputs[1].name] && (
                      <span className="text-red-500 text-xs">
                        {errors[inputs[1].name].message}
                      </span>
                    )}
                    <Controller // Componente do HookForm necessário para inputs não-nativos
                      defaultValue="" // <== Isso aqui evita o warning
                      name={inputs[1].name} // Nome do campo
                      control={control} // Estado para controlar o input fornecido pelo HookForm
                      rules={{
                        required: validators[inputs[1].name].requiredMessage,
                        validate: validators[inputs[1].name].validator,
                      }} // Demais regras. No caso, definimos este um input obrigatório
                      render={(
                        { field } // Função principal para renderizar o campo. A prop field é fornecida pelo Controller
                      ) => (
                        <MaskedInput
                          // Guarda as propriedades de field antes de adicionar as novas abaixo
                          {...field}
                          label={inputs[1].label}
                          mask={inputs[1].mask}
                          placeholder={inputs[1].mask}
                        />
                      )}
                    />
                  </div>
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

export default TestPage;
