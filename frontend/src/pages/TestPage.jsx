import { useState } from "react";

import { AutoCompleteInput, SelectInput } from "../components/atoms/Input";
import { FetchCity } from "../services/UtilsService";

const TestPage = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const options = [
    { value: "teste1", optionLabel: "teste1" },
    { value: "teste2", optionLabel: "teste2" },
    { value: "teste3", optionLabel: "teste3" },
  ];

  return (
    <div className="font-[Rajdhani] flex flex-col gap-10 items-center justify-center h-screen w-screen bg-stone-900">
      <SelectInput name="teste" placehoulder="teste" options={options} />
      <AutoCompleteInput
        loadOptionsFunction={FetchCity} // Passa a função de busca de cidades
        onChange={setSelectedCity} // Lida com a seleção final da cidade
        value={selectedCity}
        isClearable
      />
    </div>
  );
};

export default TestPage;
