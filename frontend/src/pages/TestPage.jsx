import React, { useState } from "react";
import { EditButton } from "../components/atoms/EditButton";
import { NewFooter } from "../components/organisms/Footer";
import { SaveButton } from "../components/atoms/SaveButton";

const TestPage = () => {
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const footerButtons = () => (
    <React.Fragment>
      <SaveButton className="absolute right-6" />
      <EditButton />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div className="w-8/10 min-h-[92dvh] mx-auto px-4 py-2 rounded-b bg-stone-800 border-x-2 border-b-2 border-stone-700">
        <div className="w-full bg-green-900 h-500">
          <h1>Teste maroto</h1>
        </div>
      </div>
      <NewFooter />
    </React.Fragment>
  );
};

export default TestPage;
