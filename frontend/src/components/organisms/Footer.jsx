import { SaveButton } from "../atoms/SaveButton";

export const FormFooter = ({ style, setConfirmOpen }) => {
  return (
    <div className={`w-full fixed bottom-3 ${style}`}>
      <footer className="relative mx-auto w-8/10 h-10">
        <SaveButton
          onClick={() => setConfirmOpen(true)}
          style="absolute right-6"
        />
      </footer>
    </div>
  );
};
