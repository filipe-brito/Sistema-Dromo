import React, { useState } from "react";
import { FormBuilder } from "../components/organisms/FormBuilder";
import { Tab } from "../components/templates/Tabs";
import { PersonIcon } from "../components/atoms/icons/PersonIcon";
import {
  MaskedInput,
  DefaultInput,
  SelectInput,
} from "../components/atoms/Input";
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
    {
      name: "cpf",
      type: "masked",
      label: "CPF",
      mask: "000.000.000-00",
      placeholder: "Ex: 999.999.999-99",
      required: "CPF é obrigatório",
    },
    {
      name: "cnpj",
      type: "masked",
      label: "CNPJ",
      mask: "00.000.000/0000-00",
      placeholder: "Ex: 99.999.999/9999-99",
      required: "CNPJ é obrigatório",
    },
    {
      name: "telefone",
      type: "masked",
      label: "Telefone",
      mask: "(00) 0000-0000",
      placeholder: "Ex: (99) 9999-9999",
    },
    {
      name: "gender",
      type: "select",
      label: "Sexo",
      options: [{ value: "Masculino" }, { value: "Feminino" }],
      required: "Sexo é obrigatório",
      inputStyle: "w-22",
    },
    {
      name: "email",
      type: "default",
      type2: "email",
      label: "Email",
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
                <section className="flex p-2 rounded shadow-sm bg-stone-100">
                  <form
                    id="save"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex gap-2"
                  >
                    {inputs.map((input) => {
                      switch (input.type) {
                        case "default":
                          return (
                            <div className="flex-col" key={input.name}>
                              {errors[input.name] && (
                                <span className="text-red-500 text-xs">
                                  {errors[input.name].message}
                                </span>
                              )}
                              <Controller
                                defaultValue="" // <== Isso aqui evita o warning no navegador
                                name={input.name}
                                control={control}
                                rules={{ required: input?.required }}
                                render={({ field }) => (
                                  <DefaultInput
                                    {...field}
                                    label={input.label}
                                    placeholder={input.placeholder}
                                  />
                                )}
                              />
                            </div>
                          );
                        case "masked":
                          return (
                            <div className="flex-col" key={input.name}>
                              <span>
                                {errors[input.name] && (
                                  <span className="text-red-500 text-xs">
                                    {errors[input.name].message}
                                  </span>
                                )}
                              </span>
                              <Controller // Componente do HookForm necessário para inputs não-nativos
                                defaultValue="" // <== Isso aqui evita o warning
                                name={input.name} // Nome do campo
                                control={control} // Estado para controlar o input fornecido pelo HookForm
                                rules={{
                                  required: input?.required,
                                  validate: validators[input.name]?.validator,
                                }} // Demais regras. No caso, definimos este um input obrigatório
                                render={(
                                  { field } // Função principal para renderizar o campo. A prop field é fornecida pelo Controller
                                ) => (
                                  <MaskedInput
                                    // Guarda as propriedades de field antes de adicionar as novas abaixo
                                    {...field}
                                    label={input.label}
                                    mask={input.mask}
                                    placeholder={input.placeholder}
                                  />
                                )}
                              />
                            </div>
                          );

                        case "select":
                          return (
                            <div className="flex-col" key={input.name}>
                              <span>
                                {errors[input.name] && (
                                  <span className="text-red-500 text-xs">
                                    {errors[input.name].message}
                                  </span>
                                )}
                              </span>
                              <Controller // Componente do HookForm necessário para inputs não-nativos
                                defaultValue="" // <== Isso aqui evita o warning
                                name={input.name} // Nome do campo
                                control={control} // Estado para controlar o input fornecido pelo HookForm
                                rules={{
                                  required: input?.required,
                                }} // Demais regras. No caso, definimos este um input obrigatório
                                render={(
                                  { field } // Função principal para renderizar o campo. A prop field é fornecida pelo Controller
                                ) => (
                                  <SelectInput
                                    {...field}
                                    name={input.name}
                                    label={input.label}
                                    options={input.options}
                                    inputStyle={input.inputStyle}
                                  />
                                )}
                              />
                            </div>
                          );
                      }
                    })}
                  </form>
                </section>
              ),
            },
          ]}
        />
      </div>

      <button
        form="save"
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded fixed right-30 bottom-5"
      >
        Salvar
      </button>
    </React.Fragment>
  );
};

export default TestPage;
