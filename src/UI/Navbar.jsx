import { useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import ExpandableButton from "./ExpandableButton";

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
              className="md:max-w-32 md:min-w-32 w-20 md:w-32"
            />
          </Link>
        </div>

        {/* Desktop Navbar */}
        <ul className=" md:flex space-x-8 items-center">
          {/* Logout link */}
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
        </ul>
        {/* Mobile Navbar Button */}

        {/* <button
          className="md:hidden text-white hover:text-secondary-light"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <span className="text-2xl">✖</span> // Cross icon when menu is open
          ) : (
            <span className="text-2xl">☰</span> // Hamburger icon when menu is closed
          )}
        </button> */}
      </div>

      {/* Mobile Dropdown Menu */}
      {/* {isMenuOpen && (
        <ul className="md:hidden flex justify-center bg-primary-dark text-white p-4 space-y-2">
          <li onClick={logout}>
            <Link
              to="/login"
              className="flex items-center space-x-2 hover:text-neutral-light transition duration-200"
            >
              <RiLogoutCircleLine className="text-white w-[17px] h-[17px]" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      )} */}
    </nav>
  );
};

export default Navbar;
