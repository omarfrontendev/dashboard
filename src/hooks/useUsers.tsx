import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data;
    },
    staleTime: 1000 * 60, // 💡 Data will be fresh for 1 minute
  });
}
