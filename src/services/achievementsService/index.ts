import { api } from "@/lib/api";
import { MyAchievementsData } from "./types";

export const achievementsService = {
  getMyAchievements: () => api<MyAchievementsData>({
    url: "/achievements/my",
  }).then((res) => res.data),
};