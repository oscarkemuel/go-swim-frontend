"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/lib/Button";
import { useWorkouts } from "@/hooks/useWorkouts";
import { Workout } from "@/models/Workout";
import { toast } from "sonner";
import Image from "next/image";

interface Sprint {
  timeInSeconds: number;
  meters: number;
}

export default function TimerPage() {
  const { create: createWorkoutMutation } = useWorkouts();

  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [poolSize, setPoolSize] = useState(25);

  const [startTimestamp, setStartTimestamp] = useState<number | null>(null);
  const [pausedElapsed, setPausedElapsed] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && startTimestamp) {
      interval = setInterval(() => {
        setElapsed(
          pausedElapsed + Math.floor((Date.now() - startTimestamp) / 1000)
        );
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, startTimestamp, pausedElapsed]);

  const handleStart = () => {
    if (!isRunning) {
      setStartTimestamp(Date.now());
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    if (isRunning && startTimestamp) {
      const totalSoFar =
        pausedElapsed + Math.floor((Date.now() - startTimestamp) / 1000);
      setPausedElapsed(totalSoFar);
      setIsRunning(false);
      setStartTimestamp(null);
    }
  };

  const resetSprints = () => {
    setSprints([]);
    setStartTimestamp(null);
    setPausedElapsed(0);
    setElapsed(0);
    setIsRunning(false);
  };

  const handleResetSprints = () => {
    if (isRunning) handlePause();
    if (!confirm("Tem certeza que deseja resetar?")) return;

    resetSprints();
    toast.success("Resetado com sucesso!");
  };

  const handleSaveSprint = () => {
    const newSprint: Sprint = { timeInSeconds: elapsed, meters: poolSize };
    setSprints((prev) => [...prev, newSprint]);
    toast.success(`Sprint de ${poolSize}m salvo!`);
  };

  const handleEndTraining = () => {
    if (isRunning) handlePause();
    if (!confirm("Finalizar treino?")) return;

    const data: Partial<Workout> = {
      date: new Date().toISOString(),
      fatigueLevel: 5,
      meters: sprints.reduce((acc, sprint) => acc + sprint.meters, 0),
      style: "livre",
      timeInSeconds: elapsed,
    };

    createWorkoutMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Treino salvo com sucesso!");
        resetSprints();
      },
      onError: () => {
        toast.error("Erro ao salvar treino. Tente novamente.");
      },
    });
  };

  const poolSizeOptions = [25, 50, 75, 100];
  const totalDistance = sprints.reduce((acc, sprint) => acc + sprint.meters, 0);

  const isLoading = createWorkoutMutation.isPending;

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <div className="h-screen">
      <div className="w-full flex flex-col items-center justify-center">
        {/* Pool size buttons */}
        <div className="flex gap-2 mb-4">
          {poolSizeOptions.map((size) => (
            <Button
              key={size}
              onClick={() => setPoolSize(size)}
              variant={poolSize === size ? "filled" : "outlined"}
            >
              {size}m
            </Button>
          ))}
        </div>

        <div className="mb-4 text-lg font-medium">
          Distância total: {totalDistance}m
        </div>

        <Image src="/timer.png" alt="Timer" width={200} height={200} />

        {/* Timer */}
        <div className="text-5xl font-mono my-6">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center mb-6 flex-col w-full max-w-[300px]">
          {isRunning ? (
            <Button onClick={handlePause} disabled={isLoading}>
              Pausar
            </Button>
          ) : (
            <Button onClick={handleStart} disabled={isLoading}>
              {elapsed === 0 ? "Iniciar treino" : "Continuar"}
            </Button>
          )}

          <Button
            onClick={handleSaveSprint}
            disabled={!isRunning || isLoading}
            color="gray"
          >
            Completar Sprint
          </Button>

          <Button
            onClick={handleEndTraining}
            color="green"
            disabled={sprints.length === 0 || isLoading}
            isLoading={isLoading}
          >
            Finalizar treino
          </Button>

          <Button
            onClick={handleResetSprints}
            variant="outlined"
            color="red"
            disabled={elapsed === 0 || isLoading}
          >
            Zerar
          </Button>
        </div>

        {/* Sprints list */}
        {sprints.length > 0 && (
          <div className="text-left max-w-[300px] mb-6 w-full">
            <h3 className="font-semibold mb-2">Sprints salvos:</h3>
            <ul className="list-decimal list-inside space-y-1 text-sm grid grid-cols-3 gap-2">
              {sprints.map((s, idx) => (
                <li key={idx} className="text-gray-700 bg-blue-50 p-1 rounded">
                  {Math.floor(s.timeInSeconds / 60)
                    .toString()
                    .padStart(2, "0")}
                  :{(s.timeInSeconds % 60).toString().padStart(2, "0")}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
