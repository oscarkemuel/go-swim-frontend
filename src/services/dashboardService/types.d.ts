export interface DashboardCardsData {
  totalHours: number;
  maxMeters: number;
  totalKms: number;
}

export interface DashboardLast10DayChartData {
  metersByDate: { date: string; totalMeters: number }[];
}

