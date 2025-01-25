// import {
//   FaMapMarkerAlt,
//   FaHome,
//   FaArrowDown,
//   FaArrowUp,
//   FaEye,
//   FaPlus,
// } from "react-icons/fa";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import CarWashServicesCard from "../UI/CarWashServicesCard";
// import { usePackageContext } from "../Components/PackageContext";
// import { useDeleteStationPackages } from "../Hooks/Admin/useAdmins";
// import { useQueryClient } from "@tanstack/react-query";
// import { FaPencil } from "react-icons/fa6";
// import Dropdown from "../UI/DropDown";

// function PackagesView() {
//   const dropdownItems = [
//     {
//       label: "View User",
//       icon: <FaEye />,
//       Click: (value) => {
//         navigate(`view/${value._id}`);
//       },
//     },
//     {
//       label: "Edit",
//       icon: <FaPencil className="text-lg" />,
//       Click: (value) => {
//         navigate(`edit-station/${value._id}`);
//       },
//     },
//     {
//       label: "New Package",
//       icon: <FaPlus />,
//       Click: (value) => {
//         navigate(`create/${value._id}`);
//       },
//     },
//   ];

//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const { deletePackageMutate, isPendingPackageDel } =
//     useDeleteStationPackages();

//   const {
//     dataServiceStations,
//     pendingServiceStation,
//     dataPackages,
//     pendingPackage,
//   } = usePackageContext();

//   const [searchParams, setSearchParams] = useSearchParams();
//   const isOpenStation = searchParams.get("stationId");

//   const togglePackages = (stationId) => {
//     setSearchParams(isOpenStation === stationId ? {} : { stationId });
//     if (isOpenStation !== stationId) {
//       queryClient.invalidateQueries(["getPackages", stationId]);
//     }
//   };

//   if (pendingServiceStation) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg font-semibold text-gray-500">Loading...</p>
//       </div>
//     );
//   }

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
//     <div className=" ">
//       <h2 className="text-2xl font-bold text-primary-dark mb-6 text-center">
//         Service Stations
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {dataServiceStations.map((station) => (
//           <div
//             key={station._id}
//             className="bg-white shadow-lg flex flex-col rounded-xl p-6 relative transition-transform transform hover:-translate-y-2 hover:shadow-xl"
//           >
//             {/* Dropdown Button */}
//             <div className="absolute top-2 right-2">
//               <Dropdown
//                 value={station}
//                 items={dropdownItems}
//                 buttonClassName="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none text-sm font-medium rounded-md px-2 py-1 transition"
//                 dropdownClassName="top-full right-0"
//               />
//             </div>

//             {/* Station Content */}
//             <div className="mt-2">
//               {/* Home Icon and Station Name */}
//               <h3 className="text-lg font-bold text-primary mb-2 flex gap-2">
//                 <FaHome className="text-primary-dark min-w-4 min-h-4 sm:min-w-5 mt-1 sm:min-h-5" />
//                 <span>{station.name}</span>
//               </h3>

//               {/* Location Icon and Station Location */}
//               <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
//                 <FaMapMarkerAlt className="text-red-500 min-w-4 min-h-4 " />
//                 <span>{station.location}</span>
//               </p>

//               {/* Address */}
//               <p className="text-sm text-gray-600 mb-4">{station.address}</p>
//             </div>

//             {/* Toggle Packages Button */}
//             <button
//               onClick={() => togglePackages(station._id)}
//               className="w-full bg-primary mt-auto text-white py-2 px-4 rounded-lg flex items-center justify-center transition-all hover:bg-primary-dark text-sm"
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
//           </div>
//         ))}
//       </div>

//       {/* Packages Section */}
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
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaMapMarkerAlt,
  FaHome,
  FaArrowDown,
  FaArrowUp,
  FaEye,
  FaPlus,
} from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import CarWashServicesCard from "../UI/CarWashServicesCard";
import { usePackageContext } from "../Components/PackageContext";
import { useDeleteStationPackages } from "../Hooks/Admin/useAdmins";
import { useQueryClient } from "@tanstack/react-query";
import { FaPencil } from "react-icons/fa6";
import Dropdown from "../UI/DropDown";
import { gsap } from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function PackagesView() {
  const containerRef = useRef(null);
  const dropdownItems = [
    {
      label: "View User",
      icon: <FaEye />,
      Click: (value) => navigate(`view/${value._id}`),
    },
    {
      label: "Edit",
      icon: <FaPencil className="text-lg" />,
      Click: (value) => navigate(`edit-station/${value._id}`),
    },
    {
      label: "New Package",
      icon: <FaPlus />,
      Click: (value) => navigate(`create/${value._id}`),
    },
  ];

  useGSAP(
    () => {
      gsap.from(".station-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
        },
      });

      gsap.set(".station-card", { willChange: "transform" });

      const hoverAnim = (element) =>
        gsap.to(element, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });

      const hoverOutAnim = (element) =>
        gsap.to(element, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });

      document.querySelectorAll(".station-card").forEach((card) => {
        card.addEventListener("mouseenter", () => hoverAnim(card));
        card.addEventListener("mouseleave", () => hoverOutAnim(card));
      });

      return () => {
        document.querySelectorAll(".station-card").forEach((card) => {
          card.removeEventListener("mouseenter", hoverAnim);
          card.removeEventListener("mouseleave", hoverOutAnim);
        });
      };
    },
    { scope: containerRef }
  );

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { deletePackageMutate } = useDeleteStationPackages();
  const { dataServiceStations, pendingServiceStation, dataPackages } =
    usePackageContext();
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
        <div className="animate-pulse flex space-x-4">
          <div className="w-12 h-12 bg-primary-dark rounded-full"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-neutral-light rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-neutral-light rounded"></div>
              <div className="h-4 bg-neutral-light rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!dataServiceStations?.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-neutral-dark">
          No service stations found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8" ref={containerRef}>
      <h2 className="text-3xl font-bold text-primary-dark mb-6 text-center">
        Car Wash Station Management
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {dataServiceStations.map((station) => (
          <div
            key={station._id}
            className="station-card bg-background backdrop-blur-sm shadow-lg flex flex-col rounded-xl p-6 relative transition-transform border border-white/20"
          >
            <div className="absolute top-2 right-2">
              <Dropdown
                value={station}
                items={dropdownItems}
                buttonClassName="text-primary-dark bg-white/80 hover:bg-white focus:ring-2 focus:ring-primary-dark rounded-md px-2 py-1 transition-colors shadow-sm"
                dropdownClassName="origin-top-right right-0 mt-2 w-48 rounded-md shadow-lg bg-white/95 backdrop-blur-sm ring-1 ring-black/5"
              />
            </div>

            <div className="mt-3 space-y-3">
              <h3 className="text-xl font-bold text-primary-dark flex items-center gap-3">
                <FaHome className="text-primary-dark/80 text-lg shrink-0" />
                <span className="leading-tight">{station.name}</span>
              </h3>

              <div className="space-y-2 pl-8 border-l-2 border-primary-light/30">
                <p className="text-base text-neutral-dark flex items-center gap-3">
                  <FaMapMarkerAlt className="text-primary/80 text-sm shrink-0" />
                  <span className="font-medium">{station.location}</span>
                </p>

                <p className="text-sm text-neutral-default leading-relaxed">
                  {station.address}
                </p>
              </div>
            </div>

            <button
              onClick={() => togglePackages(station._id)}
              className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors text-sm shadow-md"
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
          </div>
        ))}
      </div>

      {isOpenStation && (
        <div className="mt-8 p-6  backdrop-blur-sm   border border-white/20">
          <div
            className={`flex gap-8 justify-center flex-wrap ${
              dataPackages ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            {!dataPackages?.length ? (
              <div className="text-neutral-dark text-xl py-8">
                No packages available for this station.
              </div>
            ) : (
              dataPackages.map((service) => (
                <CarWashServicesCard
                  key={service._id}
                  service={service}
                  onDelete={deletePackageMutate}
                  className="bg-white/95 backdrop-blur-sm"
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default PackagesView;
