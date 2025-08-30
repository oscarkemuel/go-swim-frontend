import DashboardCards from "@/components/dashboard/Cards"
import Header from "@/components/layout/Header"

export default function DashboardPage() {
  return (
    <div className="h-screen">
      <Header title="Visão geral de performance" subtitle="Acompanhe seu desempenho ao longo do tempo" />
      <DashboardCards />
    </div>
  )
}
