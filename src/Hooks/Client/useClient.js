import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteClients,
  getClients,
  postClient,
  updateClients,
} from "../../Services/Client";
import toast from "react-hot-toast";

// export function useNewClient() {
//   const {
//     data: newClientData,
//     isPending: pendingAdmin,
//     error,
//   } = useQuery({
//     queryKey: ["newClient"],
//     queryFn: () => postClient({ api: "newAdmin" }),
//   });
//   return { newAdminData, pendingAdmin, error };
// }
// hooks/usepostClient.js

//create new client
export function useNewClientMutate() {
  const queryClient = useQueryClient();

  const {
    mutate: mutateClient,
    isLoading: isPending,
    isSuccess,
  } = useMutation({
    mutationFn: postClient,
    onSuccess: () => {
      toast.success("Client has been created");
      queryClient.invalidateQueries(["getClients"]);
    },
    onError: (error) => {
      toast.error("Please Try Again: " + error.message);
      console.error("Payment Error:", error);
    },
  });

  return { mutateClient, isPending, isSuccess };
}
export function UsegetClients() {
  const {
    data: dataClients,
    isPending: pendingClient,
    error,
  } = useQuery({
    queryKey: ["getClients"],
    queryFn: () => getClients({ url: "get-all-users" }),
  });
  return { dataClients, pendingClient, error };
}
export function useDeleteClientMutate() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteClient,
    isLoading: isPendingDelete,
    isSuccess,
  } = useMutation({
    mutationFn: deleteClients,
    onSuccess: () => {
      toast.success("Client has been Deleted");
      queryClient.invalidateQueries(["getClients"]);
    },
    onError: (error) => {
      toast.error("Please Try Again: " + error.message);
      console.error("deletion Error:", error);
    },
  });
  return { deleteClient, isPendingDelete, isSuccess };
}
export function useUpdateClientMutate() {
  const queryClient = useQueryClient();
  const {
    mutate: updateClient,
    isLoading: isPendingUpdate,
    isSuccess,
  } = useMutation({
    mutationFn: updateClients, // The update function you’ve defined earlier
    onSuccess: () => {
      toast.success("Client has been Updated");
      queryClient.invalidateQueries(["getClients"]);
    },
    onError: (error) => {
      toast.error("Please Try Again: " + error.message);
      console.error("update Error:", error);
    },
  });

  return { updateClient, isPendingUpdate, isSuccess };
}
