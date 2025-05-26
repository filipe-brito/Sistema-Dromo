import { EditIcon } from "./icons/ActionsIcon";

export const EditButton = ({ onClick }) => {
  return (
    <button className="cursor-pointer">
      <EditIcon
        className={
          "w-6 h-6 text-blue-700 transition-transform duration-300 hover:scale-120"
        }
      />
    </button>
  );
};
