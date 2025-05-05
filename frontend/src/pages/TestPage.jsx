import React from "react";
import { IMaskInput } from "react-imask";

const TestPage = () => {
  return (
    <div>
      <IMaskInput mask="000.000.000-00" placeholder="teste" />
    </div>
  );
};

export default TestPage;
