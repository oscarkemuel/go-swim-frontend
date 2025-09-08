"use client";
import Header from "@/components/layout/Header";
import { use } from "react";
import ShareWorkoutContent from "./ShareWorkoutContent";
import { useWorkouts } from "@/hooks/useWorkouts";
import WorkoutInfosContent from "./WorkoutInfosContent";

export default function ShareWorkoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getWorkoutById } = useWorkouts();

  const query = getWorkoutById(Number(id));

  return (
    <div className="h-screen flex gap-6 flex-wrap">
      <div className="min-w-[250px] lg:w-[500px] md:w-[400px] sm:w-[100%] w-full">
        <Header
          title={`Visualizar treino`}
          subtitle="Veja os detalhes do seu treino"
        />
        <WorkoutInfosContent query={query} />
      </div>

      <div className="min-w-[250px]">
        <Header
          title={`Compartilhar treino`}
          subtitle="Compartilhe seus treinos com amigos e familiares"
        />
        <ShareWorkoutContent query={query} />
      </div>
    </div>
  );
}
