import { UserIcon } from "../components/atoms/icons/UserIcon";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { LogoutIcon } from "../components/atoms/icons/LogoutIcon";

const TestPage = () => {
  const [userDropDown, setUserDropDown] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    Navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-stone-900">
      <div className="relative">
        <button
          onClick={() => setUserDropDown(!userDropDown)}
          className="flex items-center group rounded-2xl bg-black/40 w-16 hover:outline-2 outline-white/40 cursor-pointer active:bg-black/20"
        >
          <UserIcon className="text-green-700 h-10 w-10" />
          <span className="text-white/20 group-hover:text-white/40">
            &#9660;
          </span>
        </button>
        {userDropDown && (
          <ul className="absolute mt-3 w-30 bg-stone-300 text-neutral-800 shadow-lg rounded-md">
            <li className="flex items-center group hover:bg-stone-200 rounded-md">
              <button onclick={handleLogout} className="flex w-full px-2 py-2">
                <LogoutIcon className="text-neutral-600/70 group-hover:text-neutral-600/100" />
                Sair
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default TestPage;
