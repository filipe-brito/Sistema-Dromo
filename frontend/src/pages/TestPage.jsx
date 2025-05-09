import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Tab } from "../components/templates/Tabs";
import { PersonIcon } from "../components/atoms/icons/PersonIcon";
import { DefaultInput, MaskedInput } from "../components/atoms/Input";

const TestPage = () => {
  // Vamos criar um hook form
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
                  <section className="flex flex-wrap w-full p-2 rounded border-stone-700 shadow-sm bg-stone-100 gap-1">
                    <form
                      id="save"
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex gap-2"
                    >
                      {/* Input Nativo */}
                      <div>
                        <Controller
                          defaultValue="" // <== Isso aqui evita o warning
                          name="name"
                          control={control}
                          rules={{ required: "Nome é obrigatório" }}
                          render={({ field }) => (
                            <DefaultInput {...field} label="Nome" />
                          )}
                        />
                        {errors.nome && (
                          <span className="text-red-500">
                            {errors.nome.message}
                          </span>
                        )}
                      </div>

                      {/* Input com Máscara (CPF) */}

                      <Controller // Componente do HookForm necessário para inputs não-nativos
                        defaultValue="" // <== Isso aqui evita o warning
                        name="cpf" // Nome do campo
                        control={control} // Estado para controlar o input fornecido pelo HookFrom
                        rules={{
                          required: "O CPF é obrigatório",
                          validate: (value) =>
                            /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value) ||
                            "CPF inválido",
                        }} // Demais regras. No caso, definimos este um input obrigatório
                        render={(
                          { field } // Função principal para renderizar o campo. A prop field é fornecida pelo Controller
                        ) => (
                          <MaskedInput
                            // Guarda as propriedades de field antes de adicionar as novas abaixo
                            {...field}
                            label="CPF"
                            mask="000.000.000-00"
                            placeholder="000.000.000-00"
                          />
                        )}
                      />
                      {errors.cpf && (
                        <span className="text-red-500 text-xs">
                          {errors.cpf.message}
                        </span>
                      )}
                    </form>
                  </section>
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
