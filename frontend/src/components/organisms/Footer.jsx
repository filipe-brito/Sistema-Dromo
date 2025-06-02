import { NewButton } from "../atoms/NewButton";
import { SaveButton } from "../atoms/SaveButton";

export const FormFooter = ({ style, setConfirmOpen, onTrigger, setStatus }) => {
  return (
    <div className={`w-full fixed bottom-2 ${style}`}>
      <footer className="relative mx-auto w-8/10 h-8">
        <SaveButton // Componente de botão customizável
          // onClick vai receber uma função assíncrona
          onClick={async () => {
            setStatus("idle"); // Garante que o conteúdo apresentado ao abrir o modal seja referente ao state idle
            // Verifica se a função trigger de um formulário foi passada via prop
            if (onTrigger) {
              const isValid = await onTrigger(); // Chama a função trigger e só continua o código quando tiver retorno
              if (isValid) setConfirmOpen(true); // Abre o modal se o retorno de trigger for true
            }
          }}
          style="absolute right-6"
        />
      </footer>
    </div>
  );
};

export const NewFooter = ({ footerStyle }) => {
  return (
    <div className={`w-full fixed bottom-2 ${footerStyle}`}>
      <footer className="relative mx-auto w-8/10 h-10">
        <NewButton style="absolute right-6 my-1" />
      </footer>
    </div>
  );
};
