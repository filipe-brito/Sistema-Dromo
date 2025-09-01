import { validators } from "../../utils/validators";
import { Controller } from "react-hook-form";
import React, { useState, useRef, useEffect } from "react";
import {
  AutoCompleteInput,
  DefaultInput,
  MaskedInput,
  SelectInput,
} from "../atoms/Input";
import { ImageIcon } from "../atoms/icons/MiscellaneousIcons";
import { ErrorIcon } from "../atoms/icons/ErrorIcon";

export const FormBuilder = ({
  inputs,
  control,
  register,
  errors,
  watch,
  setValue,
}) => {
  return (
    <React.Fragment>
      {/* Iteramos a prop inputs para criar os campos do formulário usando a expressão .map() */}
      {inputs.map((input) => {
        // usamos o switch/case usando o parâmetro type de cada object do array de inputs
        switch (input.type) {
          case "default": // input padrão que criamos
            return (
              <div
                className={
                  input.gridCellStyle ? input.gridCellStyle : "flex-col"
                }
                key={input.name}
              >
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
                      inputWidth={input.inputWidth}
                    />
                  )}
                />
              </div>
            );
          case "masked": // input com máscara
            return (
              <div
                className={
                  input.gridCellStyle ? input.gridCellStyle : "flex-col"
                }
                key={input.name}
              >
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
              <div
                className={
                  input.gridCellStyle ? input.gridCellStyle : "flex-col"
                }
                key={input.name}
              >
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
                      inputWidth={input.inputStyle}
                    />
                  )}
                />
              </div>
            );
          case "autoComplete": // input de auto-complete com sistema de busca de opções
            return (
              <div
                className={
                  input.gridCellStyle ? input.gridCellStyle : "flex-col"
                }
                key={input.name}
              >
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
          case "image": // input para submeter arquivos de imagem
            // Estado que armazena a URL da imagem exibida no front
            const [displayedImage, setDisplayedImage] = useState(
              input.defaultImage // URL enviada pelo componente pai
            );
            /**
             * Vamos desestruturar o object "imageFile" capturado pelo register do RHF.
             * Renomeamos a propriedade ref para rhfRef, é uma boa prática para
             * evitar conflita com alguma outra ref que possa ser criada futuramente.
             * Extraímos somente ref e onChange, as outras propriedades serão extraídas
             * juntas no objeto rest.
             * Agora que estraímos a referência e o listener de mudança do input de imagem,
             * poderemos usar essas propriedades em funções.
             */
            const { ref: rhfRef, onChange, ...rest } = register("imageFile");

            /**
             * Para que a referência "rhfRef" possa ser manipulada pelo React Hook Form, precisamos
             * de um objeto useRef. Vamos criá-lo abaixo e atrelá-lo ao rhfRef com a função setRef.
             */
            const fileInputRef = useRef(null);

            // Crie uma função de callback para combinar as duas refs
            const setRef = (element) => {
              // Ambas referências receberão o mesmo elemento
              rhfRef(element); // A ref do React Hook Form
              fileInputRef.current = element; // A sua ref
            };

            // Criamos o handler de mudança
            const handleCombinedChange = (e) => {
              // Chama o onChange do React Hook Form primeiro para atualizar o estado
              onChange(e);

              // E então executa a lógica de pré-visualização
              const file = e.target.files[0];
              if (file) {
                const objectUrl = URL.createObjectURL(file);
                setDisplayedImage(objectUrl);
              }
            };
            // Função do RHF que monitora as mudanças no valor de um input
            const urlImage = watch("profileImageUrl");

            // Efeito para criar e limpar a URL de pré-visualização
            useEffect(() => {
              // Se não houver arquivo selecionado, verifica a URL do watch
              if (urlImage && urlImage !== "REMOVE_IMAGE") {
                setDisplayedImage(urlImage);
                return; // Não precisa de cleanup aqui, pois é uma URL normal
              }

              // Caso contrário (urlImage é "REMOVE_IMAGE" ou nulo),
              // exibe a imagem padrão.
              setDisplayedImage(input.defaultImage);
            }, [urlImage]);

            // Handler para o botão "Remover Imagem"
            const handleRemoveImage = () => {
              setDisplayedImage(input.defaultImage); // Limpa a pré-visualização
              // Limpa o valor do input de arquivo para permitir upload do mesmo arquivo novamente
              if (fileInputRef.current) {
                // Os navegadores só permitem string vazia para limpar um input file
                fileInputRef.current.value = "";
              }
              setValue("profileImageUrl", "REMOVE_IMAGE"); // Envia um sinal para o componente pai remover do BD/Cloudinary
            };

            // Handler para o botão "Mudar Imagem" (simula o clique no input de arquivo)
            // Responsável por abrir o dialog de seleção de arquivos no navegador
            const handleChangeImageClick = () => {
              fileInputRef.current.click(); // Dispara o clique no input de arquivo oculto
            };

            return (
              <div
                className={
                  input.gridCellStyle
                    ? input.gridCellStyle
                    : "justify-items-center"
                }
                key={input.name}
              >
                <span>
                  {errors[input.name] && (
                    <span className="text-red-500 text-xs">
                      {errors[input.name].message}
                    </span>
                  )}
                </span>
                <input type="text" name={input.name} className="hidden" />
                <input
                  type="file"
                  name="imageFile"
                  onChange={handleCombinedChange}
                  className={"hidden"}
                  // Use a função de callback no atributo 'ref'
                  ref={setRef}
                  {...rest}
                />
                {/* Área de exibição da imagem / ícone padrão */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-stone-400 flex items-center justify-center bg-stone-200">
                  <img
                    src={displayedImage}
                    alt="image preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Botões de Ação */}
                <div className="mt-2 flex space-x-2">
                  <button
                    type="button"
                    onClick={handleChangeImageClick}
                    className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 cursor-pointer"
                  >
                    <ImageIcon className="w-6 h-6 text-white" />
                  </button>

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 cursor-pointer"
                  >
                    <ErrorIcon className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            );
        }
      })}
    </React.Fragment>
  );
};
