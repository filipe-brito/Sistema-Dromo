export const validators = {
  cpf: {
    mask: (value) =>
      value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
    validator: (value) => {
      if (!value) return true;
      return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value) || "CPF inválido";
    },
  },
  cnpj: {
    mask: (value) =>
      value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"),
    validator: (value) => {
      if (!value) return true;
      return (
        /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value) || "CNPJ inválido"
      );
    },
  },
  telefone: {
    mask: (value) => value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3"),
    validator: (value) => {
      if (!value) return true; // permite valor vazio
      return /^\(\d{2}\) \d{4}-\d{4}$/.test(value) || "Telefone inválido";
    },
  },
  cellphone: {
    mask: (value) =>
      value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4"),
    validator: (value) => {
      if (!value) return true; // permite valor vazio
      return /^\(\d{2}\) \d{1} \d{4}-\d{4}$/.test(value) || "Celular inválido";
    },
  },
};
