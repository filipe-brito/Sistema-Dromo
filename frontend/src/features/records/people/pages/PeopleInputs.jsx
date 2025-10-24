import React from "react";
import { FetchCity } from "../../../../services/UtilsService";
import { svgToUrl } from "../../../../utils/miscellaneous";
import {
  DriverIcon,
  PersonIcon2,
} from "../../../../components/atoms/icons/PersonIcon";
import { CompanyIcon2 } from "../../../../components/atoms/icons/CompanyIcon";
import { validators } from "../../../../utils/validators";

const personIconUrl = svgToUrl(<PersonIcon2 fill="#222222" />);
const driverIconUrl = svgToUrl(<DriverIcon fill="#222222" />);

export const IndividualInputs = {
  mainData: [
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
      rules: {
        required: "Nome é obrigatório",
      },
      gridCellStyle: "col-span-2",
    },
    {
      name: "cpf",
      type: "masked",
      label: "∗ CPF",
      rules: {
        required: "CPF é obrigatório",
        validate: validators.cpf.validator,
      },
      mask: "000.000.000-00",
      placeholder: "Ex: 999.999.999-99",
    },
    {
      name: "gender",
      type: "select",
      label: "∗ Sexo",
      rules: {
        required: "Sexo é obrigatório",
      },
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
      rules: {
        validate: validators.phone.validator,
      },
      placeholder: "Ex: (99) 9999-9999",
    },
    {
      name: "cellphone",
      type: "masked",
      label: "Celular",
      mask: "(00) 0 0000-0000",
      rules: {
        validate: validators.cellphone.validator,
      },
      placeholder: "Ex: (99) 9 9999-9999",
    },
    {
      name: "dob",
      type: "default",
      type2: "date",
      label: "∗ Data de nascimento",
      rules: {
        required: "Data de nascimento é obrigatório",
      },
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
  ],
  addresses: [
    {
      name: "addresses[0].zipCode",
      type: "masked",
      mask: "00000-000",
      label: "CEP",
      rules: {
        required: "CEP é obrigatório",
        validate: validators.zipCode.validator,
      },
    },
    {
      name: "addresses[0].street",
      type: "default",
      label: "Logradouro",
      gridCellStyle: "col-span-2",
      rules: {
        required: "Logradouro é obrigatório",
      },
    },
    {
      name: "addresses[0].streetNumber",
      type: "default",
      label: "Número",
      rules: {
        required: "Número é obrigatório",
      },
    },
    {
      name: "addresses[0].neighborhood",
      type: "default",
      label: "Bairro",
      rules: {
        required: "Bairro é obrigatório",
      },
    },
    {
      name: "addresses[0].city",
      type: "autoComplete",
      label: "Cidade",
      loadOptionsFunction: FetchCity,
      gridCellStyle: "col-span-2",
      rules: {
        required: "Cidade é obrigatório",
      },
    },
  ],
  occupations: [
    {
      name: "driver",
      type: "checkbox",
      label: (
        <React.Fragment>
          <label className="font-medium text-lg">Motorista</label>
          <DriverIcon className="w-20 h-20" />
        </React.Fragment>
      ),
      color: "text-green-700",
      size: "4",
    },
  ],
};
const companyIconUrl = svgToUrl(
  <CompanyIcon2 fill="#222222" viewBox="-4.5 -4 25 25" />
);
// Array com as informações principais para criar os inputs do formulário
export const companyInputs = {
  mainData: [
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
      rules: {
        required: "Razão Social é obrigatório",
      },
      gridCellStyle: "col-span-2",
    },
    {
      name: "cnpj",
      type: "masked",
      label: "∗ CNPJ",
      rules: {
        required: "CNPJ é obrigatório",
        validate: validators.cnpj.validator,
      },
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
      rules: {
        required: "Data de fundação é obrigatório",
      },
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
      rules: {
        validate: validators.phone.validator,
      },
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
  ],
  addresses: [
    {
      name: "addresses[0].zipCode",
      type: "masked",
      mask: "00000-000",
      label: "CEP",
      rules: {
        required: "CEP é obrigatório",
        validate: validators.zipCode.validator,
      },
    },
    {
      name: "addresses[0].street",
      type: "default",
      label: "Logradouro",
      gridCellStyle: "col-span-2",
      rules: {
        required: "Logradouro é obrigatório",
      },
    },
    {
      name: "addresses[0].streetNumber",
      type: "default",
      label: "Número",
      rules: {
        required: "Número é obrigatório",
      },
    },
    {
      name: "addresses[0].neighborhood",
      type: "default",
      label: "Bairro",
      rules: {
        required: "Bairro é obrigatório",
      },
    },
    {
      name: "addresses[0].city",
      type: "autoComplete",
      label: "Cidade",
      loadOptionsFunction: FetchCity,
      gridCellStyle: "col-span-2",
      rules: {
        required: "Cidade é obrigatório",
      },
    },
  ],
};
