import DashboardCards from "@/app/dashboard/Cards";
import MetersLastDaysChart from "@/app/dashboard/Charts/MetersLastDaysChart";
import Filters from "@/app/dashboard/Filters";
import Header from "@/components/layout/Header";

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
