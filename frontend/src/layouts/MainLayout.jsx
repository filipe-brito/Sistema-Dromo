import { Outlet } from "react-router-dom";
import Header from "../components/organisms/Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-stone-800">
      <Header className="fixed w-full z-50" />
      <main className="pt-9">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
