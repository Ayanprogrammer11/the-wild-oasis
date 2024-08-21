import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";
export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const {
    mutate: updateSetting,
    isLoading: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting updated!");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { updateSetting, isUpdating, error };
}
