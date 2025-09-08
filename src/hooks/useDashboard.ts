import { dashboardService } from "@/services/dashboardService";
import { useFilterStore } from "@/store/filterStore";
import { useQuery } from "@tanstack/react-query";

export function useDashboard() {
  const { month, year } = useFilterStore();

  const cards = useQuery({
    queryKey: ["dashboard", "cards", month, year],
    queryFn: () => dashboardService.getDashboardCardsData(month, year),
  });

  const metersLastTrainings = useQuery({
    queryKey: ["dashboard", "last-trainings", month, year],
    queryFn: () => dashboardService.getLastTrainingsChartData(month, year),
  });

  return {
    cards,
    metersLastTrainings,
  };
}
