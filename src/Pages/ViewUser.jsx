import { useState } from "react";
import { useGetStationsUsers } from "../Hooks/Client/useClient";
import FullPageSpinner from "../UI/Spinner";
import { FaCaretDown } from "react-icons/fa";

function ViewUser() {
  const { dataStationUsers, pendingStationUsers } = useGetStationsUsers();

  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [sortColumn, setSortColumn] = useState("userId.firstname"); // State for sorting column
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order

  const sortingOptions = [
    { label: "Name", value: "userId.firstname" },
    { label: "Car Name", value: "carName" },
    // { label: "Number Plate", value: "carNumber" },
    { label: "Station Name", value: "serviceStationId.name" },
    { label: "Package Name", value: "packageId.title" },
  ];
  const flattenValues = (obj) => {
    let values = [];
    Object.values(obj).forEach((value) => {
      if (value && typeof value === "object") {
        values = values.concat(flattenValues(value));
      } else {
        values.push(value);
      }
    });
    return values;
  };
  // Filter and sort data
  const filteredAndSortedUsers = dataStationUsers
    ?.filter((user) => {
      // Get all nested values in the user objects and convert them to lower case strings
      const allValues = flattenValues(user).map((val) =>
        String(val).toLowerCase()
      );
      return allValues.some((value) =>
        value.includes(searchQuery.toLowerCase())
      );
    })
    ?.sort((a, b) => {
      const getValue = (obj, path) =>
        path.split(".").reduce((o, key) => o?.[key], obj);
      const aValue = getValue(a, sortColumn)?.toString().toLowerCase() || "";
      const bValue = getValue(b, sortColumn)?.toString().toLowerCase() || "";
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  console.log(filteredAndSortedUsers, dataStationUsers, "😂😂");
  if (pendingStationUsers) {
    return <FullPageSpinner />;
  }

  return (
    <div className="mt-6 bg-background p-6 rounded-lg">
      <h2 className="text-4xl font-bold text-center  sm:text-start text-primary-dark mb-4">
        Users Details
      </h2>

      {/* Responsive Search and Sorting Controls */}
      <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by any field..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full  lg:w-[40%] px-4 py-2 text-lg rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-light"
        />

        {/* Sorting and Order Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Sorting Dropdown */}
          <div className="relative">
            <select
              value={sortColumn}
              onChange={(e) => setSortColumn(e.target.value)}
              className="border rounded-full w-40 px-4 h-10 appearance-none pr-8"
            >
              {sortingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <FaCaretDown className="h-4 w-4 text-gray-500" />
            </span>
          </div>
          {/* Sorting Order Toggle */}
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="bg-primary-dark w-36   h-10  text-white rounded-full"
          >
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto min-h-[50vh] max-h-screen scrollbar-thin rounded-lg  shadow-md">
        <table className="min-w-full bg-white border rounded-md">
          <thead className="bg-primary-dark text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/6">
                Name
              </th>
              <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/6">
                Car Details
              </th>
              <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/6">
                Number Plate
              </th>
              <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/6">
                Owner Address
              </th>
              <th className="py-3 px-4 text-center text-sm uppercase font-semibold w-1/6">
                Station
              </th>
              <th className="py-3 px-4 text-center text-sm uppercase font-semibold w-1/6">
                Package
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedUsers?.length > 0 ? (
              filteredAndSortedUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-neutral-light transition duration-150"
                >
                  <td className="py-3 px-4 w-1/6">
                    <span className="font-bold text-primary-dark">
                      {user.userId.firstname} {user.userId.lastname}
                    </span>
                  </td>
                  <td className="py-3 px-4 w-1/6">
                    <p className="font-medium">{user.carName}</p>
                    <p className="text-sm text-slate-400">
                      {user.carModel} | {user.carColor}
                    </p>
                  </td>
                  <td className="py-3 px-4 w-1/6">{user.carNumber}</td>
                  <td className="py-3 px-4 w-1/6">{user.ownerAddress}</td>
                  <td className="py-3 px-4 text-center w-1/6">
                    {user.serviceStationId.name}
                  </td>
                  <td className="py-3 px-4 text-center w-1/6">
                    <p className="font-medium">{user?.packageId?.title}</p>
                    <p className="text-sm text-slate-400">
                      ${user?.packageId?.price}
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-10 text-center align-middle text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewUser;
