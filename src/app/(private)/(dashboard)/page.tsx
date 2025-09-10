import Header from "@/components/layout/Header";
import Filters from "./Filters";
import DashboardCards from "./Cards";
import MetersLastDaysChart from "./Charts/MetersLastDaysChart";

export default function DashboardPage() {
  return (
    <div className="h-screen">
      <Header
        title="Visão geral de performance"
        subtitle="Acompanhe seu desempenho ao longo do tempo"
        rightElement={<Filters />}
      />

      <div className="w-full max-w-[896px]">
        <DashboardCards />

        <div className="mt-6">
          <MetersLastDaysChart />
        </div>
      </div>
    </div>
  );
}
