import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletePackage,
  getServiceStations,
  postPackage,
  updatePackage,
} from "../../Services/Admin";
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
    queryKey: ["getPackages", stationId], // Add stationId to the queryKey
    queryFn: () =>
      getServiceStations({
        url: `get-packages-by-station/${stationId}`,
      }),
    enabled: !!stationId, // Only run the query if stationId exists
    staleTime: Infinity, // Optional: Refetch every time the stationId changes
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
export function usePostStationPackages() {
  const queryClient = useQueryClient();
  const {
    mutate: postPackageMutate,
    isLoading: isPendingPackage,
    isSuccess,
  } = useMutation({
    mutationFn: postPackage, // The update function you’ve defined earlier
    onSuccess: () => {
      toast.success("Package has been Created");
      queryClient.invalidateQueries(["getPackages"]);
    },
    onError: (error) => {
      toast.error("Please Try Again: " + error.message);
      console.error("update Error:", error);
    },
  });

  return { postPackageMutate, isPendingPackage, isSuccess };
}
export function useDeleteStationPackages() {
  const queryClient = useQueryClient();
  const {
    mutate: deletePackageMutate,
    isLoading: isPendingPackageDel,
    isSuccess,
  } = useMutation({
    mutationFn: deletePackage,
    onSuccess: (_, variables) => {
      const stationId = variables.stationId; // Ensure stationId is passed
      toast.success("Package has been Deleted");
      queryClient.invalidateQueries(["getPackages", stationId]); // Invalidate only for the relevant station
    },
    onError: (error) => {
      toast.error("Please Try Again: " + error.message);
      console.error("update Error:", error);
    },
  });

  return { deletePackageMutate, isPendingPackageDel, isSuccess };
}
export function useUpdateStationMutate() {
  const queryClient = useQueryClient();
  const {
    mutate: mutateStation,
    isLoading: isPendingUpdate,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: updatePackage, // The update function you’ve defined earlier
    onSuccess: () => {
      toast.success("Station has been Updated");
      queryClient.invalidateQueries(["getStations"]);
    },
    onError: (error) => {
      toast.error("Please Try Again: " + error.message);
      console.error("update Error:", error);
    },
  });

  return { mutateStation, isPendingUpdate, isSuccess, error };
}
