import { useRef } from "react";
import { IMaskInput } from "react-imask";
import AsyncSelect from "react-select/async";

// Input padrão do sistema
export const DefaultInput = ({
  name,
  label,
  placeholder,
  inputStyle,
  type,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm">{label}</label>
      <input
        name={name}
        type={type ? type : "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`h-9 px-1 bg-stone-200 rounded border-2 border-stone-400 text-sm ${
          inputStyle ? inputStyle : "w-40"
        }`}
      />
    </div>
  );
};

// Input com máscara
export const MaskedInput = ({
  label,
  mask,
  name,
  placeholder,
  value,
  onChange,
  inputStyle,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm">{label}</label>
      <IMaskInput
        // Cada object interado tem seus atributos. Vamos atribuir esses atributos adequadamente ao input
        mask={mask} // aplica a máscara no campo
        name={name} // Atribui o valor da chave 'name' ao nome do input
        placeholder={placeholder} // O texto exibido no campo será o valor da chave 'placeholder'
        value={value} // controla o que está digitado no campo. Os colchetes diz ao React para pegar o valor da chave daquele object
        onChange={onChange} // Executa handleChange a cada evento. React envia o próprio evento como argumento
        className={`h-9 px-1 bg-stone-200 rounded border-2 border-stone-400 text-sm ${
          inputStyle ? inputStyle : "w-40"
        }`}
      />
    </div>
  );
};

export const SelectInput = ({
  name,
  label,
  options,
  inputStyle,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="text-sm">
        {label}
      </label>
      <select
        id={name}
        value={value}
        onChange={onChange}
        className={`h-9 px-1 bg-stone-200 rounded border-2 border-stone-400 text-sm ${
          inputStyle ? inputStyle : "w-40"
        }`}
      >
        <option value="">Selecione...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
};

export const AutoCompleteInput = ({ loadOptionsFunction, label }) => {
  const debounceTimeout = useRef(null);

  const loadOptions = (inputValue, callback) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (inputValue.trim().length < 4) {
      callback([]);
      return;
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        const options = await loadOptionsFunction(inputValue);
        callback(options);
      } catch (error) {
        callback([]);
        console.error(error.message);
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="text-sm">
        {label}
      </label>
      <AsyncSelect
        loadOptions={loadOptions}
        noOptionsMessage={({ inputValue: currentInput }) =>
          currentInput.trim().length < 4
            ? `Digite mais ${
                4 - currentInput.trim().length
              } para buscar os dados.`
            : "Nenhuma opção encontrada."
        }
        placeholder="Selecione..."
        loadingMessage={() => "Carregando..."}
        classNames={{
          control: (
            state // Estiliza o contêiner principal do input
          ) =>
            `!h-9 !w-50 !bg-stone-200 !rounded !border-2 !border-stone-400 !text-sm
               ${state.isFocused ? "!ring-1 !ring-none" : ""}`,
          input: () => "!text-gray-900", // Estiliza o input de texto
          placeholder: () => "!text-black", // Estiliza o placeholder
          menu: () =>
            "!bg-white !rounded-lg !shadow-lg !border !border-gray-200 mt-2", // Estiliza o menu dropdown
          option: (
            state // Estiliza cada opção no menu
          ) =>
            `!py-2 !px-3 !cursor-pointer !border-b !border-stone-400 ! ${
              state.isSelected
                ? "!bg-blue-100 !text-blue-700"
                : "!text-gray-900"
            } ${state.isFocused ? "!bg-stone-300" : ""}`,
          singleValue: () => "!text-gray-900", // Estiliza o valor selecionado (se não for multi)
          clearIndicator: () => "!text-gray-500 hover:!text-gray-700", // Estiliza o X de limpar
          dropdownIndicator: () => "!text-gray-500 hover:!text-gray-700", // Estiliza a setinha
        }}
      />
    </div>
  );
};
