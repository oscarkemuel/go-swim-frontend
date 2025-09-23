import Header from "@/components/layout/Header";
import { WorkoutTable } from "./_components/WorkoutTable";
import { Suspense } from "react";
import Loading from "./_components/WorkoutTable/loading";

export default function WorkoutsPage() {
  return (
    <div>
      <Header title="Registro de treinos" subtitle="Cadastre suas atividades físicas" />
      <Suspense fallback={<Loading />}>
        <WorkoutTable />
      </Suspense>
    </div>
  );
}
