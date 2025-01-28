import { useState } from "react";
import { useGetStationsUsers } from "../Hooks/Client/useClient";
import FullPageSpinner from "../UI/Spinner";

function ViewUser() {
  const { dataStationUsers, pendingStationUsers } = useGetStationsUsers();
  console.log(dataStationUsers);

  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [sortColumn, setSortColumn] = useState("userId.firstname"); // State for sorting column
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order

  const sortingOptions = [
    { label: "Name", value: "userId.firstname" },
    { label: "Car Name", value: "carName" },
    { label: "Number Plate", value: "carNumber" },
    { label: "Station Name", value: "serviceStationId.name" },
    { label: "Package Name", value: "packageId.title" },
  ];

  // Filter and sort data
  const filteredAndSortedUsers = dataStationUsers
    ?.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    ?.sort((a, b) => {
      const getValue = (obj, path) =>
        path.split(".").reduce((o, key) => o?.[key], obj);
      const aValue = getValue(a, sortColumn)?.toString().toLowerCase() || "";
      const bValue = getValue(b, sortColumn)?.toString().toLowerCase() || "";
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  if (pendingStationUsers) {
    return <FullPageSpinner />;
  }

  return (
    <div className="mt-6 bg-background p-6 rounded-lg">
      <h2 className="text-4xl font-bold text-primary-dark mb-4">
        Users Details
      </h2>

      {/* Search and Sorting Controls */}
      <div className="mb-4 flex justify-between items-center">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by any field..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-1/3"
        />
        <div className="flex gap-4 items-center">
          {/* Sorting Dropdown */}
          <select
            value={sortColumn}
            onChange={(e) => setSortColumn(e.target.value)}
            className="p-2 border rounded-md"
          >
            {sortingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                Sort by {option.label}
              </option>
            ))}
          </select>
          {/* Sorting Order Toggle */}
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="p-2 bg-primary-dark text-white rounded-md"
          >
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto min-h-[50vh] max-h-screen scrollbar-thin shadow-md">
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
