// import { useState } from "react";
// import { FaUserPlus } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav className="bg-primary-dark text-white p-4 max-w-[1440px] mx-auto rounded-b-md w-[90%]">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-2xl font-bold">
//           <Link to="/" className="text-secondary-light">
//             LOGO
//           </Link>
//         </div>
//         <ul className="hidden md:flex space-x-8 items-center">
//           {/* Add "Create New Admin" link */}
//           <li>
//             <Link
//               to="/admin"
//               className="flex items-center space-x-2 hover:text-neutral-light transition duration-200"
//             >
//               <FaUserPlus />
//               <span>Create New Admin</span>
//             </Link>
//           </li>
//           <button className="flex items-center justify-start w-[45px] h-[45px] border-none rounded-full cursor-pointer relative overflow-hidden transition duration-300 shadow-[2px_2px_10px_rgba(0,0,0,0.199)] bg-primary hover:w-[125px] hover:rounded-[40px] active:translate-x-[2px] active:translate-y-[2px]">
//             <div className="sign flex items-center justify-center w-full transition duration-300 hover:w-[30%] pl-5">
//               <svg className="w-[17px]" viewBox="0 0 24 24">
//                 <path
//                   d="M12 10v4m2-2h-4"
//                   stroke="white"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
//             <span className="text absolute right-0 w-0 opacity-0 text-white text-[1.2em] font-semibold transition duration-300 hover:opacity-100 hover:w-[70%] pr-[10px]">
//               Text
//             </span>
//           </button>
//         </ul>
//         <button
//           className="md:hidden text-white hover:text-secondary-light"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           ☰
//         </button>
//       </div>
//       {isMenuOpen && (
//         <ul className="md:hidden bg-primary-dark text-white p-4 space-y-2">
//           {/* Add "Create New Admin" link for mobile */}
//           <li>
//             <Link
//               to="admin"
//               className="flex items-center space-x-2 hover:text-primary-light transition duration-200"
//             >
//               <FaUserPlus />
//               <span>Create New Admin</span>
//             </Link>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import ExpandableButton from "./ExpandableButton";
import { RiLogoutBoxFill, RiLogoutCircleLine } from "react-icons/ri";

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
