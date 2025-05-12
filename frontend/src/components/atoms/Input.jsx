import { IMaskInput } from "react-imask";

// Input padrão do sistema
export const DefaultInput = ({
  key,
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
        className={`h-6 px-1 bg-stone-200 rounded border-2 border-stone-400 text-xs ${
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
        className={`h-6 px-1 bg-stone-200 rounded border-2 border-stone-400 text-xs ${
          inputStyle ? inputStyle : "w-40"
        }`}
      />
    </div>
  );
};
