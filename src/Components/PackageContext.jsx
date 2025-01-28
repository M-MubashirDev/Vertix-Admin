import { createContext, useContext } from "react";
import {
  UsegetServiceStations,
  UsegetStationPackages,
} from "../Hooks/Admin/useAdmins";

const Package = createContext();

function PackageContext({ children }) {
  const { dataServiceStations, pendingServiceStation } =
    UsegetServiceStations(); // Fetching service station data
  const { dataPackages, pendingPackage, isSuccess } = UsegetStationPackages();
  console.log(dataPackages, "😁😁");
  return (
    <Package.Provider
      value={{
        dataServiceStations,
        pendingServiceStation,
        dataPackages,
        pendingPackage,
        isSuccess,
      }}
    >
      {children}
    </Package.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePackageContext = function () {
  const context = useContext(Package);
  if (!context) {
    throw new Error("usePackageContext must be used within an PackageContext");
  }
  return context;
};

export default PackageContext;
