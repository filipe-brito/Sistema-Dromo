import React, { useState } from "react";
import { DeleteIcon, EditIcon } from "../components/atoms/icons/ActionsIcon";
import { EditButton } from "../components/atoms/EditButton";
import { DeleteButton } from "../components/atoms/DeleteButton";
import { ConfirmModal } from "../components/molecules/ConfirmModal";

const TestPage = () => {
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const actionsColumn = (
    <div className="p-1/2 flex items-center">
      <EditButton />
      <DeleteButton onClick={() => setConfirmOpen(true)} />
    </div>
  );

  return (
    <React.Fragment>
      {isConfirmOpen && (
        <ConfirmModal
          status={status}
          setStatus={setStatus}
          setConfirmOpen={setConfirmOpen}
        />
      )}
      <div className="flex p-2 rounded shadow-sm bg-stone-100">
        {actionsColumn}
      </div>
    </React.Fragment>
  );
};

export default TestPage;
