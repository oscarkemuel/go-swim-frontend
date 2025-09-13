import Header from "@/components/layout/Header";
import { WorkoutTable } from "./WorkoutTable";

export default function WorkoutsPage() {
  return (
    <div className="h-screen">
      <Header title="Registro de treinos" subtitle="Cadastre suas atividades físicas" />
      <WorkoutTable />
    </div>
  );
}
