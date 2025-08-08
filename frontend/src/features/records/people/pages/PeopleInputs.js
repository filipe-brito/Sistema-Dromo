import { personIconUrl } from "../../../../components/atoms/icons/PersonIcon";
import { FetchCity } from "../../../../services/UtilsService";

export const IndividualInputs = [
  {
    name: "profileImageUrl",
    type: "image",
    label: "Profile Image",
    defaultImage: personIconUrl,
    gridCellStyle: "justify-items-center self-start row-span-3",
  },
  {
    name: "name",
    type: "default",
    label: "Nome",
    required: "Nome é obrigatório",
    gridCellStyle: "col-span-2",
  },
  {
    name: "cpf",
    type: "masked",
    label: "CPF",
    required: "CPF é obrigatório",
    mask: "000.000.000-00",
    placeholder: "Ex: 999.999.999-99",
  },
  {
    name: "gender",
    type: "select",
    label: "Sexo",
    required: "Sexo é obrigatório",
    options: [
      { optionLabel: "masculino", value: "M" },
      { optionLabel: "feminina", value: "F" },
    ],
  },
  {
    name: "maritalStatus",
    type: "select",
    label: "Estado civil",
    options: [
      { optionLabel: "Solteiro", value: "solteiro" },
      { optionLabel: "Casado", value: "casado" },
    ],
  },
  {
    name: "phone",
    type: "masked",
    label: "Telefone",
    mask: "(00) 0000-0000",
    placeholder: "Ex: (99) 9999-9999",
  },
  {
    name: "cellphone",
    type: "masked",
    label: "Celular",
    mask: "(00) 0 0000-0000",
    placeholder: "Ex: (99) 9 9999-9999",
  },
  {
    name: "dob",
    type: "default",
    type2: "date",
    label: "Data de nascimento",
    required: "Data de nascimento é obrigatório",
  },
  {
    name: "rg",
    type: "default",
    label: "RG",
  },
  {
    name: "rntrc",
    type: "default",
    label: "RNTRC",
  },
  {
    name: "email",
    type: "default",
    type2: "email",
    label: "Email",
  },
  {
    name: "birthCity",
    type: "autoComplete",
    label: "Cidade de nascimento",
    loadOptionsFunction: FetchCity,
    gridCellStyle: "col-span-2",
  },
];
