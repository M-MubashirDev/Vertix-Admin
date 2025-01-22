// import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Dropdown from "../UI/DropDown";
// import { useDeleteClientMutate } from "../Hooks/Client/useClient";
// import { useClientContext } from "./ClientContext";

// const ClientsTable = () => {
//   const navigate = useNavigate();
//   const { Client } = useClientContext();
//   const { dataClients, pendinAdmin } = Client;
//   const { deleteClient, isPendingDelete } = useDeleteClientMutate();
//   console.log(dataClients);
//   const { totalUsers, users } = dataClients || {};

//   const dropdownItems = [
//     {
//       label: "View",
//       icon: <FaEye />,
//       Click: (value) => {
//         navigate(`view/${value._id}`);
//       },
//     },
//     {
//       label: "Edit",
//       icon: <FaEdit />,
//       Click: (value) => {
//         navigate(`edit/${value._id}`);
//       },
//     },
//     {
//       label: "Delete",
//       icon: <FaTrashAlt />,
//       Click: (value) => {
//         if (!value) return;
//         deleteClient({ url: `delete-user`, id: value._id });
//         console.log("value", value);
//       },
//     },
//   ];

//   return (
//     <div className="mt-6 bg-background p-6 rounded-lg">
//       <h2 className="text-xl font-bold text-primary-dark mb-4">Users List</h2>
//       <div className="overflow-x-auto scrollbar-thin min-h-[50vh] shadow-md">
//         <table className="min-w-full bg-white border rounded-md">
//           <thead className="bg-primary-dark text-white">
//             <tr>
//               <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/4">
//                 Name
//               </th>
//               <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/4">
//                 Email
//               </th>
//               <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/6">
//                 Phone
//               </th>
//               <th className="py-3 px-4 text-center text-sm uppercase font-semibold w-1/6">
//                 Clients
//               </th>
//               <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/6">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {users?.length > 0 ? (
//               users?.map((client) => (
//                 <tr
//                   key={client._id}
//                   className="border-b hover:bg-neutral-light transition duration-150"
//                 >
//                   <td className="py-3 px-4 flex items-center space-x-4 w-1/4">
//                     <img
//                       src={client.img}
//                       alt={client.name}
//                       className="min-w-10 h-10 rounded-full border border-gray-300"
//                     />
//                     <span className="font-bold text-primary-dark">
//                       {client.name}
//                     </span>
//                   </td>
//                   <td
//                     className="py-3 px-4 truncate w-1/4"
//                     style={{ maxWidth: "12rem" }}
//                   >
//                     {client.email}
//                   </td>
//                   <td className="py-3 px-4 whitespace-nowrap w-1/6">
//                     {client.firstname}
//                   </td>
//                   <td className="py-3 px-4 text-center w-1/6">
//                     {client.clients}
//                   </td>
//                   <td className="py-3 px-4 relative text-end w-1/6">
//                     <Dropdown
//                       value={client}
//                       items={dropdownItems}
//                       buttonClassName="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//                       dropdownClassName="top-full right-0"
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="py-10 text-center align-middle text-gray-500"
//                 >
//                   <div className="flex justify-center items-center h-[200px]">
//                     No client found
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ClientsTable;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useClientContext } from "../Hooks/ClientContext"; // Custom context
import { useDeleteClientMutate } from "../Hooks/Client/useClient"; // Custom hook
import Dropdown from "../UI/DropDown"; // Dropdown component
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useClientContext } from "./ClientContext";

function RegisterUserDetails() {
  const navigate = useNavigate();
  const { Client } = useClientContext();
  const { dataClients, pendinAdmin } = Client;
  const { deleteClient, isPendingDelete } = useDeleteClientMutate();

  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [sortColumn, setSortColumn] = useState("firstname"); // State for sorting column
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order

  const sortingOptions = [
    { label: "First Name", value: "firstname" },
    { label: "Last Name", value: "lastname" },
    { label: "Email", value: "email" },
  ];

  const { totalUsers, users } = dataClients || { totalUsers: 0, users: [] };

  // Dropdown items for actions
  const dropdownItems = [
    {
      label: "View",
      icon: <FaEye />,
      Click: (value) => {
        navigate(`view/${value._id}`);
      },
    },
    {
      label: "Edit",
      icon: <FaEdit />,
      Click: (value) => {
        navigate(`edit/${value._id}`);
      },
    },
    {
      label: "Delete",
      icon: <FaTrashAlt />,
      Click: (value) => {
        if (!value) return;
        deleteClient({ url: `delete-user`, id: value._id });
        console.log("Deleted:", value);
      },
    },
  ];

  // Filter and sort data
  const filteredAndSortedUsers = users
    ?.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    ?.sort((a, b) => {
      const aValue = a[sortColumn]?.toString().toLowerCase() || "";
      const bValue = b[sortColumn]?.toString().toLowerCase() || "";
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  if (pendinAdmin) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        Loading...
      </div>
    );
  }

  return (
    <div className="mt-6 bg-background p-6 rounded-lg">
      <h2 className="text-xl font-bold text-primary-dark mb-4">User Details</h2>

      {/* Display Total Users */}
      <p className="text-sm text-primary-dark mb-4">
        Total Users: <span className="font-bold">{totalUsers}</span>
      </p>

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

      {/* Table */}
      <div className="overflow-x-auto min-h-[50vh] max-h-screen scrollbar-thin shadow-md">
        <table className="min-w-full bg-white border rounded-md">
          <thead className="bg-primary-dark text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/4">
                First Name
              </th>
              <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/4">
                Last Name
              </th>
              <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/4">
                Email
              </th>
              <th className="py-3 px-4 text-left text-sm uppercase font-semibold w-1/4">
                Actions
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
                  <td className="py-3 px-4 w-1/4">{user.firstname}</td>
                  <td className="py-3 px-4 w-1/4">{user.lastname}</td>
                  <td className="py-3 px-4 w-1/4">{user.email}</td>
                  <td className="py-3 px-4 w-1/4 text-end">
                    <Dropdown
                      value={user}
                      items={dropdownItems}
                      buttonClassName="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      dropdownClassName="top-full right-0"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
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

export default RegisterUserDetails;
