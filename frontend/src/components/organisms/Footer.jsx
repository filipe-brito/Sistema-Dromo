import { SaveButton } from "../atoms/SaveButton";

export const FormFooter = ({ style, setConfirmOpen, onTrigger, setStatus }) => {
  return (
    <div className={`w-full fixed bottom-3 ${style}`}>
      <footer className="relative mx-auto w-8/10 h-10">
        <SaveButton
          onClick={async () => {
            setStatus("idle"); // só abre o modal se estiver tudo certo
            if (onTrigger) {
              const isValid = await onTrigger(); // valida os campos
              if (isValid) setConfirmOpen(true);
            }
          }}
          style="absolute right-6"
        />
      </footer>
    </div>
  );
};
