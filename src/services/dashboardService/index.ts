import { api } from "@/lib/api";
import { DashboardCardsData, DashboardLast10DayChartData } from "./types";

export const dashboardService = {
  getDashboardCardsData: async (month?: number, year?: number) =>
    api<DashboardCardsData>({
      url: "/dashboard/cards",
      params: { month, year },
    }).then((res) => res.data),

  getLastTrainingsChartData: async (month?: number, year?: number) =>
    api<DashboardLast10DayChartData>({
      url: "/dashboard/meters-last-trainings",
      params: { month, year },
    }).then((res) => res.data),
};
