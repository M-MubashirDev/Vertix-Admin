import { Outlet } from "react-router-dom";
import Navbar from "../UI/Navbar";

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="max-w-[1440px] mx-auto w-[90%]">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
