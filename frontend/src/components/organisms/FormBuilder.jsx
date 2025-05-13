import { validators } from "../../utils/validators";
import { useForm, Controller } from "react-hook-form";
import { DefaultInput, MaskedInput } from "../atoms/Input";

export const FormBuilder = ({ inputs, onSubmit }) => {
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

  return (
    <section className="flex p-2 rounded shadow-sm bg-stone-100">
      <form id="save" onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        {inputs.map((input) =>
          input.mask ? (
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
          ) : (
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
          )
        )}
      </form>
    </section>
  );
};
