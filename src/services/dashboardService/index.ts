import { api } from "@/lib/api";
import { DashboardCardsData } from "./types";

export const dashboardService = {
  getDashboardCardsData: async () => api<DashboardCardsData>({url: "/dashboard/cards"})
};
