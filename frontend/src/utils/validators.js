export const validators = {
  cpf: {
    mask: (value) =>
      value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
    validator: (value) =>
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value) || "CPF inválido",
    requiredMessage: "CPF é obrigatório",
  },
  cnpj: {
    mask: (value) =>
      value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"),
    validator: (value) =>
      /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value) || "CNPJ inválido",
    requiredMessage: "CNPJ é obrigatório",
  },
  telefone: {
    mask: (value) => value.replace(/(\d{2})(\d{4})(\d{4})/, "($1)$2-$3"),
    validator: (value) =>
      /^\(\d{2}\) \d{4}-\d{4}$/.test(value) || "Telefone inválido",
    requiredMessage: "Telefone é obrigatório",
  },
};
