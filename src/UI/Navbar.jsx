import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import ExpandableButton from "./ExpandableButton";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BiPlus } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function logout() {
    localStorage.removeItem("authToken");
  }
  return (
    <nav className="bg-primary-dark text-white p-4 max-w-[1440px] mx-auto rounded-b-md w-[90%]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-secondary-light">
            <img
              src="logowhite.png"
              alt="LOGO"
              className="max-w-32 min-w-32 w-32  "
            />
          </Link>
        </div>
        <ul className="hidden md:flex space-x-8 items-center">
          {/* Add "Create New Admin" link */}
          <li>
            <Link
              to="/client"
              className="flex items-center space-x-2 hover:text-neutral-light transition duration-200"
            >
              <ExpandableButton
                text="New Client"
                icon={<FaUserPlus className="text-white w-[17px] h-[17px]" />}
              />
            </Link>
          </li>
          <li>
            <Link
              to="package"
              className="flex items-center space-x-2 hover:text-neutral-light transition duration-200"
            >
              <ExpandableButton
                text="Package"
                icon={<IoMdEye className="text-white w-[17px] h-[17px]" />}
              />
            </Link>
          </li>{" "}
          <li onClick={logout}>
            <Link
              to="package"
              className="flex items-center space-x-2 hover:text-neutral-light transition duration-200"
            >
              <ExpandableButton
                text="Package"
                icon={<BiPlus className="text-white w-[17px] h-[17px]" />}
              />
            </Link>
          </li>
          <li onClick={logout}>
            <Link
              to="/login"
              className="flex items-center space-x-2 hover:text-neutral-light transition duration-200"
            >
              <ExpandableButton
                text="Logout"
                icon={
                  <RiLogoutCircleLine className="text-white w-[17px] h-[17px]" />
                }
              />
            </Link>
          </li>
          {/* Expandable Button */}
        </ul>
        <button
          className="md:hidden text-white hover:text-secondary-light"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>
      {isMenuOpen && (
        <ul className="md:hidden bg-primary-dark text-white p-4 space-y-2">
          {/* Add "Create New Admin" link for mobile */}
          <li>
            <Link
              to="client"
              className="flex items-center space-x-2 hover:text-primary-light transition duration-200"
            >
              <FaUserPlus />
              <span>Create New Client</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
