import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import loginAdmin from "../../Services/useLoginAdmin";
import { useNavigate } from "react-router-dom";

function useMutateLoginAdmin() {
  const navigate = useNavigate();
  const { mutate: loginAdminMutate, isPending: pendLogin } = useMutation({
    mutationFn: loginAdmin,
    onSuccess: () => {
      toast.success("Login successful!");
      navigate("/");
    },
    onError: (error) => {
      toast.error("Login failed. Please try again.");
      console.error("Login failed:", error);
    },
  });
  return { loginAdminMutate, pendLogin };
}

export default useMutateLoginAdmin;
