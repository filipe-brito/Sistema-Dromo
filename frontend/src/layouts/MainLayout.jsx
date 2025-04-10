import { Outlet } from "react-router-dom";
import Header from "../components/organisms/Header";

const MainLayout = () => {
  return (
    <div className="font-[Rajdhani] min-h-screen bg-stone-800">
      <Header className="fixed w-full z-50" />
      <main className="pt-[8dvh]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
