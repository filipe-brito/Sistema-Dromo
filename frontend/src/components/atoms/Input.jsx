import { useState, useEffect } from "react";
import { IMaskInput } from "react-imask";

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
        className={`h-7 px-1 bg-stone-200 rounded border-2 border-stone-400 text-sm ${
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
        className={`h-7 px-1 bg-stone-200 rounded border-2 border-stone-400 text-sm ${
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
  inputWidth,
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
        className={`h-7 px-1 bg-stone-200 rounded border-2 border-stone-400 text-sm ${
          inputWidth ? inputWidth : "w-40"
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

export const AutoCompleteInput = ({
  label,
  inputWidth,
  fetchOptions,
  value,
  onChange,
  name,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [listOptions, setListOptions] = useState([]);

  // 💡 Atualiza estado quando value mudar (ex: reset ou edição)
  useEffect(() => {
    if (value && typeof value === "object") {
      setInputValue(value.label || "");
    } else if (!inputValue || inputValue.trim().length === 0) {
      setInputValue("");
    } else {
      setInputValue("");
    }
  }, [value]);

  // 👉 Efeito com debounce para buscar dados
  useEffect(() => {
    if (inputValue.trim().length < 4) {
      setListOptions([]);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      fetchOptions(inputValue)
        .then((results) => setListOptions(results))
        .catch((err) => console.error("Erro na busca:", err))
        .finally(() => setLoading(false));
    }, 500); // debounce de 500ms

    return () => clearTimeout(timeout); // limpa se o usuário continuar digitando
  }, [inputValue]);

  // 👉 Evento ao clicar numa opção
  const handleSelect = (option) => {
    setInputValue(option.label); // mostra no input
    setActiveDropdown(false);
    onChange(option); // ← Atualiza o valor no React Hook Form!
  };

  return (
    <div className="relative flex flex-col">
      <label className="text-sm">{label}</label>
      {/* Input visível: sem name */}
      <input
        className={`h-7 px-1 bg-stone-200 rounded border-2 border-stone-400 text-sm ${
          inputWidth ? inputWidth : "w-40"
        }`}
        onChange={(e) => {
          const newValue = e.target.value;
          setInputValue(newValue);

          // ⚠️ Se o usuário apagar, notifica que é nulo
          if (newValue.trim() === "") {
            onChange("");
          }
        }}
        onFocus={() => setActiveDropdown(true)}
        onBlur={() => setActiveDropdown(false)}
        value={inputValue}
      />

      {/* Input escondido: este é enviado no submit */}
      <input
        type="hidden"
        name={name}
        value={value?.value || ""} // ou JSON.stringify(value)
      />

      {activeDropdown && (
        <ul className="absolute mt-1 p-1 top-full bg-white border w-full rounded">
          {!loading && inputValue.trim().length < 4 && (
            <p className="p-2 text-gray-500">
              Digite mais {4 - inputValue.trim().length} caracteres
            </p>
          )}
          {loading && <li className="p-2 text-gray-500">Carregando...</li>}
          {!loading &&
            listOptions.length > 0 &&
            listOptions.map((opt) => (
              <li
                key={opt.value}
                onMouseDown={() => handleSelect(opt)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {opt.label}
              </li>
            ))}
          {!loading &&
            inputValue.trim().length >= 4 &&
            listOptions.length === 0 && (
              <li className="p-2 text-gray-500">Nenhuma opção encontrada</li>
            )}
        </ul>
      )}
    </div>
  );
};
