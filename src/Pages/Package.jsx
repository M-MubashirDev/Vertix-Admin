import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaHome, FaArrowDown, FaArrowUp } from "react-icons/fa";
import {
  UsegetServiceStations,
  UsegetStationPackages,
} from "../Hooks/Admin/useAdmins";
import { useSearchParams } from "react-router-dom";
import CarWashServicesCard from "../UI/CarWashServicesCard";

function ServiceStations() {
  const { dataServiceStations, pendingServiceStation } =
    UsegetServiceStations(); // Fetching service station data
  const { dataPackages, pendingPackage } = UsegetStationPackages();

  const [searchParams, setSearchParams] = useSearchParams();
  const isOpenStation = searchParams.get("stationId");

  console.log(dataPackages);

  const togglePackages = (stationId) => {
    // setOpenStation(openStation === stationId ? null : stationId);
    console.log(stationId === isOpenStation);
    setSearchParams(isOpenStation === stationId ? {} : { stationId });
  };
  useEffect(() => {
    console.log(searchParams.get("stationId"));
  }, [searchParams]);

  // Handle loading state
  if (pendingServiceStation) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  // Handle no data scenario
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
            {/* Station Name and Details */}
            <h3 className="text-lg font-bold text-primary mb-2 flex items-center">
              <FaHome className="mr-2 text-primary-dark" />
              {station.name}
            </h3>
            <p className="text-sm text-gray-600 flex items-center mb-1">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              {station.location}
            </p>
            <p className="text-sm text-gray-600 mb-4">{station.address}</p>

            {/* Toggle Button */}
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

            {/* Packages Section */}
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 border-t border-gray-300">
        {isOpenStation && (
          <div className="flex  gap-12 justify-center flex-wrap">
            {dataPackages ? (
              dataPackages?.map((service) => (
                <div key={service._id}>
                  <CarWashServicesCard service={service} />
                </div>
              ))
            ) : (
              <div className="text-gray-600 text-2xl font-sans">
                <h1>There are no services.</h1>
              </div>
            )}
          </div>
        )}
        {/* Replace the above placeholder with actual package cards */}
      </div>
    </div>
  );
}

export default ServiceStations;
