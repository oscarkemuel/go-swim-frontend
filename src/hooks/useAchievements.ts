import { achievementsService } from "@/services/achievementsService";
import { useQuery } from "@tanstack/react-query";

export function useAchievements() {
  const getMyAchievements = () => {
    return useQuery({
      queryKey: ["my-achievements"],
      queryFn: achievementsService.getMyAchievements,
      refetchOnWindowFocus: false,
    });
  };

  return { getMyAchievements };
}
