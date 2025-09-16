import Header from "@/components/layout/Header";
import DashboardCards from "./_components/Cards";
import MetersLastDaysChart from "./_components/Charts/MetersLastDaysChart";
import Filters from "./_components/Filters";

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
