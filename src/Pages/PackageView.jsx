// import { useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
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
// import { gsap } from "gsap";
// import HeadingWithAnimation from "../Components/HeadingWithAnimation";
// import { getAuthData } from "../Hooks/useSecurity";
// import FullPageSpinner, { Spinner } from "../UI/Spinner";

// gsap.registerPlugin(useGSAP, ScrollTrigger);

// function PackagesView() {
//   const { user } = getAuthData();
//   const containerRef = useRef(null);
//   const packageSectionRef = useRef(null); // Reference for the package section
//   const dropdownItems = [
//     {
//       label: "View User",
//       icon: <FaEye />,
//       Click: (value) => navigate(`users/${value._id}`),
//     },
//     {
//       label: "Edit",
//       icon: <FaPencil className="text-lg" />,
//       Click: (value) => navigate(`edit-station/${value._id}`),
//     },
//     // {
//     //   label: "New Package",
//     //   icon: <FaPlus />,
//     //   Click: (value) => navigate(`create/${value._id}`),
//     // },
//   ];

//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const { deletePackageMutate } = useDeleteStationPackages();
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

//     // Scroll to package section if dataPackages and stationId are available
//     if (stationId) {
//       setTimeout(() => {
//         packageSectionRef.current?.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }, 100); // Slight delay to ensure the section is visible before scrolling
//     }
//   };

//   if (pendingServiceStation) {
//     return <FullPageSpinner />;
//   }

//   return (
//     <div className="space-y-8 py-6" ref={containerRef}>
//       <div className="mb-8">
//         <HeadingWithAnimation user={user} />
//       </div>
//       {!dataServiceStations?.length ? (
//         <div className="flex justify-center items-center">
//           <p className="text-lg font-semibold text-neutral-dark">
//             No service stations found.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-2  gap-6 px-4">
//           {dataServiceStations.map((station) => (
//             <div
//               key={station._id}
//               className="station-card  bg-white  shadow-lg flex flex-col rounded-xl p-6 relative transition-transform border border-white/20"
//             >
//               <div className="absolute top-2 right-2">
//                 <Dropdown
//                   value={station}
//                   items={dropdownItems}
//                   buttonClassName="text-primary-dark bg-white/80 hover:bg-white focus:ring-2 focus:ring-primary-dark rounded-md px-2 py-1 transition-colors shadow-sm"
//                   dropdownClassName="origin-top-right right-0 mt-2 w-48 rounded-md shadow-lg bg-white/95 ring-1 ring-black/5"
//                 />
//               </div>
//               <div className="flex flex-col  sm:flex-row items-center gap-4">
//                 <img
//                   src={station.image} // Replace with the appropriate image path
//                   alt="Logo"
//                   className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-primary-dark object-cover"
//                 />
//                 <div className="mt-3 space-y-3 text-center md:text-left">
//                   <h3 className="text-xl font-bold  text-primary-dark flex  gap-3 justify-center md:justify-start">
//                     <FaHome className="text-lg mt-1 shrink-0" />
//                     <span className="leading-tight">{station.name}</span>
//                   </h3>

//                   <div className="space-y-2 flex flex-col items-center sm:items-start  sm:pl-8 border-l-2 border-primary-light/30">
//                     <p className="text-base text-neutral-dark flex  sm:items-center gap-3">
//                       <FaMapMarkerAlt className="text-sm shrink-0" />
//                       <span className="font-medium">{station.location}</span>
//                     </p>

//                     <p className="text-sm text-neutral-default leading-relaxed">
//                       {station.address}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col justify-center items-center sm:flex-row gap-2 mt-2">
//                 <button
//                   onClick={() => togglePackages(station._id)}
//                   className="w-full h-[40px] bg-primary hover:bg-primary-dark text-white sm:font-bold py-2 px-4 rounded-full flex items-center justify-center transition-colors text-sm shadow-md"
//                 >
//                   {isOpenStation === station._id ? (
//                     <>
//                       Hide Packages <FaArrowUp className="ml-2" />
//                     </>
//                   ) : (
//                     <>
//                       View Packages <FaArrowDown className="ml-2" />
//                     </>
//                   )}
//                 </button>
//                 <button
//                   onClick={() => navigate(`create/${station._id}`)}
//                   className="w-full h-[40px] bg-primary hover:bg-primary-dark text-white sm:font-bold py-2 px-4 rounded-full flex items-center justify-center transition-colors text-sm shadow-md"
//                 >
//                   <>
//                     New Package <FaPlus className="ml-2" />
//                   </>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       {(isOpenStation || pendingPackage) && (
//         <div
//           ref={packageSectionRef}
//           className="mt-8 p-6 border border-white/20"
//         >
//           <div
//             className={`flex gap-8 justify-center flex-wrap ${
//               dataPackages ? "opacity-100" : "opacity-0"
//             } transition-opacity duration-300`}
//           >
//             {!dataPackages?.length ? (
//               <div className="text-neutral-dark text-xl py-8">
//                 {pendingPackage ? (
//                   <Spinner />
//                 ) : (
//                   "No packages available for this station."
//                 )}
//               </div>
//             ) : (
//               dataPackages.map((service) => (
//                 <CarWashServicesCard
//                   key={service._id}
//                   service={service}
//                   isOpenStation={isOpenStation}
//                   onDelete={deletePackageMutate}
//                   className="bg-white/95"
//                 />
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PackagesView;
import { useRef } from "react";
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
import HeadingWithAnimation from "../Components/HeadingWithAnimation";
import { getAuthData } from "../Hooks/useSecurity";
import FullPageSpinner, { Spinner } from "../UI/Spinner";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function PackagesView() {
  const { user } = getAuthData();
  const containerRef = useRef(null);
  const packageSectionRef = useRef(null); // Reference for the package section
  const dropdownItems = [
    {
      label: "View User",
      icon: <FaEye />,
      Click: (value) => navigate(`users/${value._id}`),
    },
    {
      label: "Edit",
      icon: <FaPencil className="text-lg" />,
      Click: (value) => navigate(`edit-station/${value._id}`),
    },
    // {
    //   label: "New Package",
    //   icon: <FaPlus />,
    //   Click: (value) => navigate(`create/${value._id}`),
    // },
  ];

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { deletePackageMutate } = useDeleteStationPackages();
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

    // Scroll to package section if dataPackages and stationId are available
    if (stationId) {
      setTimeout(() => {
        packageSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100); // Slight delay to ensure the section is visible before scrolling
    }
  };

  if (pendingServiceStation) {
    return <FullPageSpinner />;
  }

  return (
    <div className="space-y-8 py-6" ref={containerRef}>
      <div className="mb-8">
        <HeadingWithAnimation user={user} />
      </div>
      {!dataServiceStations?.length ? (
        <div className="flex justify-center items-center">
          <p className="text-lg font-semibold text-neutral-dark">
            No service stations found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-2  gap-6 px-4">
          {dataServiceStations.map((station) => (
            <div
              key={station._id}
              className="station-card  bg-white  shadow-lg flex flex-col rounded-xl p-6 relative transition-transform border border-white/20"
            >
              <div className="absolute top-2 right-2">
                <Dropdown
                  value={station}
                  items={dropdownItems}
                  buttonClassName="text-primary-dark bg-white/80 hover:bg-white focus:ring-2 focus:ring-primary-dark rounded-md px-2 py-1 transition-colors shadow-sm"
                  dropdownClassName="origin-top-right right-0 mt-2 w-48 rounded-md shadow-lg bg-white/95 ring-1 ring-black/5"
                />
              </div>
              <div className="flex flex-col  sm:flex-row items-center gap-4">
                <img
                  src={station.image} // Replace with the appropriate image path
                  alt="Logo"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-primary-dark object-cover"
                />
                <div className="mt-3 space-y-3 text-center md:text-left">
                  <h3 className="text-xl font-bold  text-primary-dark flex  gap-3 justify-center md:justify-start">
                    <FaHome className="text-lg mt-1 shrink-0" />
                    <span className="leading-tight">{station.name}</span>
                  </h3>

                  <div className="space-y-2 flex flex-col items-center sm:items-start  sm:pl-8 border-l-2 border-primary-light/30">
                    <p className="text-base text-neutral-dark flex  sm:items-center gap-3">
                      <FaMapMarkerAlt className="text-sm shrink-0" />
                      <span className="font-medium">{station.location}</span>
                    </p>

                    <p className="text-sm text-neutral-default leading-relaxed">
                      {station.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center sm:flex-row gap-2 mt-2">
                <button
                  onClick={() => togglePackages(station._id)}
                  className="w-full h-[40px] bg-primary hover:bg-primary-dark text-white sm:font-bold py-2 px-4 rounded-full flex items-center justify-center transition-colors text-sm shadow-md"
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
                  className="w-full h-[40px] bg-primary hover:bg-primary-dark text-white sm:font-bold py-2 px-4 rounded-full flex items-center justify-center transition-colors text-sm shadow-md"
                >
                  <>
                    New Package <FaPlus className="ml-2" />
                  </>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {(isOpenStation || pendingPackage) && (
        <div
          ref={packageSectionRef}
          className="mt-8 p-6 border border-white/20"
        >
          <div
            className={`flex gap-8 justify-center flex-wrap ${
              dataPackages ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            {!dataPackages?.length ? (
              <div className="text-neutral-dark text-xl py-8">
                {pendingPackage ? (
                  <Spinner />
                ) : (
                  "No packages available for this station."
                )}
              </div>
            ) : (
              dataPackages.map((service) => (
                <CarWashServicesCard
                  key={service._id}
                  service={service}
                  isOpenStation={isOpenStation}
                  onDelete={deletePackageMutate}
                  className="bg-white/95"
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
