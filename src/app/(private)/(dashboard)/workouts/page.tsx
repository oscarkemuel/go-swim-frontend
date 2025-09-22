import Header from "@/components/layout/Header";
import { WorkoutTable } from "./_components/WorkoutTable";

export default function WorkoutsPage() {
  return (
    <div>
      <Header title="Registro de treinos" subtitle="Cadastre suas atividades físicas" />
      <WorkoutTable />
    </div>
  );
}
