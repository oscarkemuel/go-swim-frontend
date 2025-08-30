import { dashboardService } from "@/services/dashboardService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useDashboard() {
  const queryClient = useQueryClient();

  const cards = useQuery({
    queryKey: ["dashboard", "cards"],
    queryFn: () => dashboardService.getDashboardCardsData()
  });

  return {
    cards
  };
}
