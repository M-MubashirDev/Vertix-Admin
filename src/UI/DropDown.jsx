import { useState, useRef, useEffect } from "react";

const Dropdown = ({
  buttonIcon,
  buttonClassName,
  dropdownClassName,
  items,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className={`p-2 text-sm font-medium rounded-lg ${buttonClassName}`}
      >
        {buttonIcon || (
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15"
          >
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${dropdownClassName}`}
        >
          <ul className="p-2 text-sm text-gray-700 dark:text-gray-200">
            {items.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => item.Click(value)}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
