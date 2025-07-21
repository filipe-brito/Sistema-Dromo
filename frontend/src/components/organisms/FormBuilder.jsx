import { validators } from "../../utils/validators";
import { useForm, Controller } from "react-hook-form";
import {
  AutoCompleteInput,
  DefaultInput,
  MaskedInput,
  SelectInput,
} from "../atoms/Input";
import { useEffect } from "react";

export const FormBuilder = ({ inputs, onSubmit, onTriggerReady, data }) => {
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
  } = useForm(); // Hook do React para formulários

  // Efeito colateral para enviar o trigger ao componente pai
  useEffect(() => {
    // Abaixo, Condicional que verifica se a prop onTriggerReady foi enviada
    if (onTriggerReady) {
      onTriggerReady(trigger); // Envia o trigger para o onTriggerReady do pai para que ele use como argumento de uma função
    }
  }, []); // apenas uma vez

  // Efeito colateral que envia os dados ao reset quando `data` for fornecida (edição)
  useEffect(() => {
    // Abaixo, condicional que verifica se a prop data é true
    if (data) {
      // Aplica máscaras se existir um validador com .mask
      // A máscara não é aplicada no reset, o que quebra o validate.
      // Vamos formatar os dados antes de inserí-los nos campos
      // Object.entries converte objects em array de pares [chave, valor]
      // .reduce itera todos os pares e junta tudo em um novo object (acc)
      // Para cada iteração, o .reduce aplica a máscara ao par
      const formattedData = Object.entries(data).reduce((acc, [key, value]) => {
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
      }, {});

      // Executa o reset com os dados como argumento. O reset vai preencher os campos do formulário automaticamente
      // Retornamos o object reformatado pelo redux. Agora, o validate passa normalmente
      reset(formattedData);
    }
    // "Sempre declare todas as dependências que você usa dentro do efeito."
  }, []); // As dependências garantem que o reset será feito sempre que data e reset mudarem

  return (
    <section className="flex p-2 rounded shadow-sm bg-stone-100">
      {/* No jsx montamos um form html */}
      <form
        id="save" // Vincula o onSubmit em qualquer elemente que tenha esse mesmo id
        onSubmit={handleSubmit(onSubmit)} // OI que deverá ser feito ao submeter o formulário
        className="flex gap-2 flex-wrap items-end"
      >
        {/* Iteramos a prop inputs para criar os campos do formulário usando a expressão .map() */}
        {inputs.map((input) => {
          // usamos o switch/case usando o parâmetro type de cada object do array de inputs
          switch (input.type) {
            case "default": // input padrão que criamos
              return (
                <div className="flex-col" key={input.name}>
                  {/** Abaixo há a expressão que verifica se esse campo contém erro.
                   * Se tiver, apresenta a mensagem recebida na prop
                   */}
                  {errors[input.name] && (
                    <span className="text-red-500 text-xs">
                      {errors[input.name].message}
                    </span>
                  )}
                  {/**Abaixo, componente que é adicionado à propriedade control do useForm */}
                  <Controller
                    defaultValue="" // Boa prática nunca deixar campos com null ou undefined
                    name={input.name} // Nome do campo. Serve como identificador
                    control={control} // Passa o estado control do useFrom para esse componente via prop. Essa prop é obrigatória
                    rules={{ required: input.required }} // Regras para validação (required e validate)
                    // Abaixo, prop obrigatória. É onde passamos o componente customizável para ser gerenciado pelo Controller
                    // O argumento field é um objeto do hook form com
                    // valores gerados automaticamente. É um objeto necessário para vincular o input ao useForm
                    render={({ field }) => (
                      // DefaultInput é o nosso input customizado. Ele recebe suas props nativas e mais o objeto field
                      <DefaultInput
                        {...field}
                        label={input.label}
                        placeholder={input.placeholder}
                        type={input.type2}
                        inputStyle={input.inputStyle}
                      />
                    )}
                  />
                </div>
              );
            case "masked": // input com máscara
              return (
                <div className="flex-col" key={input.name}>
                  <span>
                    {errors[input.name] && (
                      <span className="text-red-500 text-xs">
                        {errors[input.name].message}
                      </span>
                    )}
                  </span>
                  <Controller
                    defaultValue=""
                    name={input.name}
                    control={control}
                    rules={{
                      required: input.required,
                      // É um input com validate. Os formatos são salvos no arquivo validators que criamos
                      // Caso não exista esse validator no componente, usamos o encadeamento "?" para retornar undefined
                      validate: validators[input.name]?.validator,
                    }} // Demais regras. No caso, definimos este um input obrigatório
                    render={({ field }) => (
                      <MaskedInput
                        {...field}
                        label={input.label}
                        mask={input.mask}
                        placeholder={input.placeholder}
                      />
                    )}
                  />
                </div>
              );

            case "select": // input de seleções
              return (
                <div className="flex-col" key={input.name}>
                  <span>
                    {errors[input.name] && (
                      <span className="text-red-500 text-xs">
                        {errors[input.name].message}
                      </span>
                    )}
                  </span>
                  <Controller
                    defaultValue=""
                    name={input.name}
                    control={control}
                    rules={{
                      required: input?.required,
                    }}
                    render={({ field }) => (
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

            case "autoComplete": // input de auto-complete com sistema de busca de opções
              return (
                <div className="flex-col" key={input.name}>
                  <span>
                    {errors[input.name] && (
                      <span className="text-red-500 text-xs">
                        {errors[input.name].message}
                      </span>
                    )}
                  </span>
                  <Controller
                    defaultValue=""
                    name={input.name}
                    control={control}
                    rules={{
                      required: input?.required,
                    }}
                    render={({ field }) => (
                      <AutoCompleteInput
                        {...field}
                        name={input.name}
                        label={input.label}
                        inputWidth={input.inputWidth}
                        fetchOptions={input.loadOptionsFunction}
                      />
                    )}
                  />
                </div>
              );
          }
        })}
      </form>
    </section>
  );
};
