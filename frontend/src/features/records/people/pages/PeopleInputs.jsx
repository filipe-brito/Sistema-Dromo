import { FetchCity } from "../../../../services/UtilsService";
import { svgToUrl } from "../../../../utils/miscellaneous";
import { PersonIcon2 } from "../../../../components/atoms/icons/PersonIcon";
import { CompanyIcon2 } from "../../../../components/atoms/icons/CompanyIcon";

const personIconUrl = svgToUrl(<PersonIcon2 fill="#222222" />);

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
    label: "∗ Nome",
    required: "Nome é obrigatório",
    gridCellStyle: "col-span-2",
  },
  {
    name: "cpf",
    type: "masked",
    label: "∗ CPF",
    required: "CPF é obrigatório",
    mask: "000.000.000-00",
    placeholder: "Ex: 999.999.999-99",
  },
  {
    name: "gender",
    type: "select",
    label: "∗ Sexo",
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
    label: "∗ Data de nascimento",
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
const companyIconUrl = svgToUrl(
  <CompanyIcon2 fill="#222222" viewBox="-4.5 -4 25 25" />
);
// Array com as informações principais para criar os inputs do formulário
export const companyInputs = [
  {
    name: "profileImageUrl",
    type: "image",
    label: "Profile Image",
    defaultImage: companyIconUrl,
    gridCellStyle: "justify-items-center self-start row-span-3",
  },
  {
    name: "companyName",
    type: "default",
    label: "∗ Razão Social",
    required: "Razão Social é obrigatório",
    gridCellStyle: "col-span-2",
  },
  {
    name: "cnpj",
    type: "masked",
    label: "∗ CNPJ",
    required: "CNPJ é obrigatório",
    placeholder: "Ex: 99.999.999/9999-99",
    mask: "00.000.000/0000-00",
  },
  {
    name: "tradeName",
    type: "default",
    label: "Nome Fantasia",
    gridCellStyle: "col-span-2",
  },
  {
    name: "doe",
    type: "default",
    type2: "date",
    label: "∗ Data de Fundação",
    required: "Data de fundação é obrigatório",
  },
  {
    name: "municipalRegistration",
    type: "default",
    label: "Inscrição Municipal",
  },
  {
    name: "stateRegistration",
    type: "default",
    label: "Inscrição Estadual",
  },
  {
    name: "phone",
    type: "masked",
    label: "Telefone",
    mask: "(00) 0000-0000",
    placeholder: "Ex: (99) 9999-9999",
  },
  {
    name: "email",
    type: "default",
    type2: "email",
    label: "Email",
    gridCellStyle: "col-span-2",
  },
];
