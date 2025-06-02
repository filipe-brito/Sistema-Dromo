import { EditIcon } from "./icons/ActionsIcon";

export const EditButton = ({ onClick }) => {
  return (
    <button className="cursor-pointer" onClick={onClick}>
      <EditIcon
        className={
          "w-6 h-6 text-gray-500 transition-transform duration-300 hover:scale-120"
        }
      />
    </button>
  );
};
