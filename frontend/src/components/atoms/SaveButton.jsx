import { SaveIcon } from "./icons/SaveIcon";

export const SaveButton = ({ onClick, style }) => {
  return (
    <button
      onClick={onClick}
      className={`group flex gap-2 bg-blue-900 text-neutral-50 px-3 py-1 rounded cursor-pointer ${style}`}
    >
      <SaveIcon className="w-6 h-6 transition-transform duration-300 group-hover:scale-120" />
      <span className="transition-transform duration-300 group-hover:scale-120">
        Salvar
      </span>
    </button>
  );
};
