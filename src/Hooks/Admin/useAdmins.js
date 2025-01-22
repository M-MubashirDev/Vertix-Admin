import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getServiceStations, updatePackage } from "../../Services/Admin";
import { getAuthData } from "../useSecurity";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export function UsegetServiceStations() {
  const { user } = getAuthData() || {};

  const {
    data: dataServiceStations,
    isPending: pendingServiceStation,
    error,
  } = useQuery({
    queryKey: ["getStations"],
    queryFn: () => getServiceStations({ url: `service-stations/${user.id}` }),
  });
  return { dataServiceStations, pendingServiceStation, error };
}
export function UsegetStationPackages() {
  const [searchParams] = useSearchParams();
  const stationId = searchParams.get("stationId");

  const {
    data: dataPackages,
    isPending: pendingPackage,
    error,
  } = useQuery({
    queryKey: ["getPackages", stationId], // Add stationId to queryKey for better caching
    queryFn: () =>
      getServiceStations({
        url: `get-packages-by-station/${
          stationId || "678f7da88d171d2ec3a7f831"
        }`,
      }),
    staleTime: 0, // Set stale time to zero
  });

  return { dataPackages, pendingPackage, error };
}
export function useUpdatePackageMutate() {
  const queryClient = useQueryClient();
  const {
    mutate: mutatePackage,
    isLoading: isPendingUpdate,
    isSuccess,
  } = useMutation({
    mutationFn: updatePackage, // The update function you’ve defined earlier
    onSuccess: () => {
      toast.success("Package has been Updated");
      queryClient.invalidateQueries(["getPackages"]);
    },
    onError: (error) => {
      toast.error("Please Try Again: " + error.message);
      console.error("update Error:", error);
    },
  });

  return { mutatePackage, isPendingUpdate, isSuccess };
}
