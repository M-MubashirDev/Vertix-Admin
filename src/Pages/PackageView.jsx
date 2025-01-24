// import { useEffect } from "react";
// import { FaMapMarkerAlt, FaHome, FaArrowDown, FaArrowUp } from "react-icons/fa";

// import { useNavigate, useSearchParams } from "react-router-dom";
// import CarWashServicesCard from "../UI/CarWashServicesCard";
// import { usePackageContext } from "../Components/PackageContext";
// import { useDeleteStationPackages } from "../Hooks/Admin/useAdmins";
// import { useQueryClient } from "@tanstack/react-query";

// function PackagesView() {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   // delete-package/:id
//   const { deletePackageMutate, isPendingPackageDel } =
//     useDeleteStationPackages();

//   const {
//     dataServiceStations,
//     pendingServiceStation,
//     dataPackages,
//     pendingPackage,
//   } = usePackageContext();

//   console.log(dataPackages);

//   const [searchParams, setSearchParams] = useSearchParams();
//   const isOpenStation = searchParams.get("stationId");

//   const togglePackages = (stationId) => {
//     setSearchParams(isOpenStation === stationId ? {} : { stationId });

//     // Clear dataPackages (optional, handled by React Query already)
//     if (isOpenStation !== stationId) {
//       queryClient.invalidateQueries(["getPackages", stationId]);
//     }
//   };

//   // Handle loading state
//   if (pendingServiceStation) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg font-semibold text-gray-500">Loading...</p>
//       </div>
//     );
//   }

//   // Handle no data scenario
//   if (!dataServiceStations || dataServiceStations.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg font-semibold text-gray-500">
//           No service stations found.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-2xl font-bold text-primary-dark mb-6">
//         Service Stations
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {dataServiceStations.map((station) => (
//           <div
//             key={station._id}
//             className="bg-white shadow-lg rounded-xl p-6 relative transition-transform transform hover:-translate-y-2 hover:shadow-xl"
//           >
//             {/* Station Name and Details */}
//             <h3 className="text-lg font-bold text-primary mb-2 flex items-center">
//               <FaHome className="mr-2 text-primary-dark" />
//               {station.name}
//             </h3>
//             <p className="text-sm text-gray-600 flex items-center mb-1">
//               <FaMapMarkerAlt className="mr-2 text-red-500" />
//               {station.location}
//             </p>
//             <p className="text-sm text-gray-600 mb-4">{station.address}</p>

//             {/* Toggle Button */}
//             <button
//               onClick={() => togglePackages(station._id)}
//               className="w-full bg-primary text-white py-2 px-4 rounded-lg flex items-center justify-center transition-all hover:bg-primary-dark"
//             >
//               {isOpenStation === station._id ? (
//                 <>
//                   Hide Packages <FaArrowUp className="ml-2" />
//                 </>
//               ) : (
//                 <>
//                   View Packages <FaArrowDown className="ml-2" />
//                 </>
//               )}
//             </button>
//             <button
//               onClick={() => navigate(`create/${station._id}`)}
//               className="w-full mt-2 bg-primary text-white py-2 px-4 rounded-lg flex items-center justify-center transition-all hover:bg-primary-dark"
//             >
//               New Package
//             </button>
//           </div>
//         ))}
//       </div>
//       <div className="mt-4 p-4 border-t border-gray-300">
//         {isOpenStation && (
//           <div
//             className={`flex gap-12 justify-center flex-wrap transform transition-all duration-300 ${
//               dataPackages ? "opacity-100 scale-100" : "opacity-0 scale-95"
//             }`}
//           >
//             {!dataPackages || dataPackages.length === 0 ? (
//               <div className="text-gray-600 text-2xl font-sans">
//                 <h1>No packages available for this station.</h1>
//               </div>
//             ) : (
//               dataPackages.map((service, index) => (
//                 <div
//                   key={service._id}
//                   className={`transition-all duration-300 delay-${index * 100}`}
//                 >
//                   <CarWashServicesCard
//                     isOpenStation={isOpenStation}
//                     setSearchParams={setSearchParams}
//                     service={service}
//                     onDelete={deletePackageMutate}
//                   />
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PackagesView;
import { FaMapMarkerAlt, FaHome, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import CarWashServicesCard from "../UI/CarWashServicesCard";
import { usePackageContext } from "../Components/PackageContext";
import { useDeleteStationPackages } from "../Hooks/Admin/useAdmins";
import { useQueryClient } from "@tanstack/react-query";
import { FaPencil } from "react-icons/fa6";

function PackagesView() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { deletePackageMutate, isPendingPackageDel } =
    useDeleteStationPackages();

  const {
    dataServiceStations,
    pendingServiceStation,
    dataPackages,
    pendingPackage,
  } = usePackageContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const isOpenStation = searchParams.get("stationId");

  const togglePackages = (stationId) => {
    setSearchParams(isOpenStation === stationId ? {} : { stationId });
    if (isOpenStation !== stationId) {
      queryClient.invalidateQueries(["getPackages", stationId]);
    }
  };

  if (pendingServiceStation) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!dataServiceStations || dataServiceStations.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500">
          No service stations found.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-primary-dark mb-6">
        Service Stations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataServiceStations.map((station) => (
          <div
            key={station._id}
            className="bg-white shadow-lg rounded-xl p-6 relative transition-transform transform hover:-translate-y-2 hover:shadow-xl"
          >
            {/* Edit Button added here */}
            <button
              onClick={() => navigate(`edit-station/${station._id}`)}
              className="absolute top-2 right-2 p-2 text-primary hover:text-primary-dark transition-colors"
              title="Edit Station"
            >
              <FaPencil className="text-lg" />
            </button>

            <h3 className="text-lg font-bold text-primary mb-2 flex items-center">
              <FaHome className="mr-2 text-primary-dark" />
              {station.name}
            </h3>
            <p className="text-sm text-gray-600 flex items-center mb-1">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              {station.location}
            </p>
            <p className="text-sm text-gray-600 mb-4">{station.address}</p>

            <button
              onClick={() => togglePackages(station._id)}
              className="w-full bg-primary text-white py-2 px-4 rounded-lg flex items-center justify-center transition-all hover:bg-primary-dark"
            >
              {isOpenStation === station._id ? (
                <>
                  Hide Packages <FaArrowUp className="ml-2" />
                </>
              ) : (
                <>
                  View Packages <FaArrowDown className="ml-2" />
                </>
              )}
            </button>
            <button
              onClick={() => navigate(`create/${station._id}`)}
              className="w-full mt-2 bg-primary text-white py-2 px-4 rounded-lg flex items-center justify-center transition-all hover:bg-primary-dark"
            >
              New Package
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 border-t border-gray-300">
        {isOpenStation && (
          <div
            className={`flex gap-12 justify-center flex-wrap transform transition-all duration-300 ${
              dataPackages ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {!dataPackages || dataPackages.length === 0 ? (
              <div className="text-gray-600 text-2xl font-sans">
                <h1>No packages available for this station.</h1>
              </div>
            ) : (
              dataPackages.map((service, index) => (
                <div
                  key={service._id}
                  className={`transition-all duration-300 delay-${index * 100}`}
                >
                  <CarWashServicesCard
                    service={service}
                    onDelete={deletePackageMutate}
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PackagesView;
