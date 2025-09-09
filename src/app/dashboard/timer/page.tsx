"use client";
import Header from "@/components/layout/Header";
import { useStopwatch } from "react-timer-hook";
import { useState } from "react";
import { Button } from "@/components/lib/Button";
import { is, se } from "date-fns/locale";
import { useWorkouts } from "@/hooks/useWorkouts";
import { Workout } from "@/models/Workout";
import { toast } from "sonner";

interface Sprint {
  min: number;
  sec: number;
  meters: number;
}

export default function TimerPage() {
  const { create: createWorkoutMutation } = useWorkouts();
  const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [poolSize, setPoolSize] = useState(25);

  const handleSaveSprint = () => {
    const newSprint: Sprint = { min: minutes, sec: seconds, meters: poolSize };
    setSprints((prev) => [...prev, newSprint]);
  };

  const handleResetSprints = () => {
    if (isRunning) {
      pause();
    }

    if (!confirm("Tem certeza que deseja resetar?")) return;
    
    setSprints([]);
    reset(undefined, false);
  };

  const handleEndTraining = () => {
    if (isRunning) {
      pause();
    }

    if (!confirm("Finalizar treino?")) return;

    const data: Partial<Workout> = {
      date: new Date().toISOString(),
      fatigueLevel: 5,
      meters: sprints.reduce((acc, sprint) => acc + sprint.meters, 0),
      style: "livre",
      timeInSeconds: minutes * 60 + seconds,
    };

    createWorkoutMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Treino salvo com sucesso!");
        setSprints([]);
        reset(undefined, false);
      },
      onError: () => {
        toast.error("Erro ao salvar treino. Tente novamente.");
      },
    });
  };

  const poolSizeOptions = [25, 50, 75, 100];
  const totalDistance = sprints.reduce((acc, sprint) => acc + sprint.meters, 0);

  const isLoading = createWorkoutMutation.isPending;

  return (
    <div className="h-screen">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex gap-2 mb-4">
          {poolSizeOptions.map((size) => (
            <Button
              key={size}
              onClick={() => setPoolSize(size)}
              filled={poolSize === size ? true : false}
            >
              {size}m
            </Button>
          ))}
        </div>

        <div className="mb-4 text-lg font-medium">
          Distância total: {totalDistance}m
        </div>

        <img src="/timer.png" alt="Timer" className="max-h-40 max-w-40 " />

        {/* Timer */}
        <div className="text-5xl font-mono my-6">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>

        {/* Controles */}
        <div className="flex gap-3 justify-center mb-6 flex-col w-full max-w-[300px]">
          {isRunning ? (
            <Button onClick={pause}>Pausar</Button>
          ) : (
            <Button onClick={start}>
              {seconds + minutes === 0 ? "Iniciar" : "Continuar"}
            </Button>
          )}

          <Button
            onClick={handleSaveSprint}
            disabled={!isRunning}
            variant="gray"
          >
            Completar Sprint
          </Button>

          <Button
            onClick={handleEndTraining}
            variant="green"
            disabled={sprints.length === 0 || isLoading}
          >
            Finalizar treino
          </Button>

          <Button
            onClick={handleResetSprints}
            filled={false}
            variant="red"
            disabled={seconds + minutes === 0}
          >
            Zerar
          </Button>
        </div>

        {/* Lista de Sprints */}
        {sprints.length > 0 && (
          <div className="text-left max-w-[300px] mb-6 w-full">
            <h3 className="font-semibold mb-2">Sprints salvos:</h3>
            <ul className="list-decimal list-inside space-y-1 text-sm grid grid-cols-3 gap-2">
              {sprints.map((s, idx) => (
                <li key={idx} className="text-gray-700 bg-blue-50 p-1 rounded">
                  {String(s.min).padStart(2, "0")}:
                  {String(s.sec).padStart(2, "0")}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
