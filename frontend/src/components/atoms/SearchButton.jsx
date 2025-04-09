import { SearchIcon1 } from "../icons/SearchIcon.jsx";

export const SearchButton = () => {
  return (
    <button className="group absolute right-0 p-1 rounded-md bg-violet-500 cursor-pointer">
      <SearchIcon1 className="w-4 h-4 text-white transition-transform duration-300 group-hover:scale-110" />
    </button>
  );
};
