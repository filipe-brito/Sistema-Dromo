import { IndividualInputs } from "../features/records/people/pages/PeopleInputs";
import React, { useEffect } from "react";

const TestPage = () => {
  const addressInputs = IndividualInputs.addresses;

  console.log(addressInputs);

  const validateGroup = true;

  let rules = IndividualInputs.mainData.map((input, index) => {
    return {
      rules: input.rules,
      name: input.name,
      index: index,
    };
  });
  console.log("Teste de rules: ", rules);

  useEffect(() => {
    if (validateGroup) {
      const inputNames = addressInputs.map((input) => input.name);
      console.log("Nomes dos campos: ", inputNames);
    }
  });

  return (
    <div className="font-[Rajdhani] flex flex-col gap-10 items-center justify-center h-screen w-screen bg-stone-900">
      <h1 className="text-4xl text-stone-50">Teste</h1>
      <p>Veja se o console imprimiu os nomes dos campos</p>
    </div>
  );
};

export default TestPage;
