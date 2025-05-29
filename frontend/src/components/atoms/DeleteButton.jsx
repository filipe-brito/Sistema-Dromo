import { DeleteIcon } from "./icons/ActionsIcon";

export const DeleteButton = ({ onClick }) => {
  return (
    <button className="cursor-pointer" onClick={onClick}>
      <DeleteIcon
        className={
          "w-6 h-6 text-red-500 transition-transform duration-300 hover:scale-120"
        }
      />
    </button>
  );
};
