"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/lib/Button";
import { Workout } from "@/models/Workout";
import { toast } from "sonner";
import Image from "next/image";
import TimerImage from "@/../public/images/timer.png";
import ResetConfirmModal from "./_components/ResetConfirmModal";
import FinishConfirmModal from "./_components/FinishConfirmModal";
import {
  LOCAL_STORAGE_CURRENT_SPRINTS_KEY,
  LOCAL_STORAGE_CURRENT_TIMER_KEY,
} from "@/constants";

interface Sprint {
  timeInSeconds: number;
  meters: number;
}

export default function TimerPage() {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [poolSize, setPoolSize] = useState(25);

  const [startTimestamp, setStartTimestamp] = useState<number | null>(null);
  const [pausedElapsed, setPausedElapsed] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [resetConfirmModalOpen, setResetConfirmModalOpen] = useState(false);
  const [finishConfirmModalOpen, setFinishConfirmModalOpen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && startTimestamp) {
      interval = setInterval(() => {
        const newElapsed =
          pausedElapsed + Math.floor((Date.now() - startTimestamp) / 1000);
        setElapsed(newElapsed);
        localStorage.setItem(
          LOCAL_STORAGE_CURRENT_TIMER_KEY,
          newElapsed.toString()
        );
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, startTimestamp, pausedElapsed]);

  useEffect(() => {
    const savedTimer = localStorage.getItem(LOCAL_STORAGE_CURRENT_TIMER_KEY);
    const savedSprints = localStorage.getItem(
      LOCAL_STORAGE_CURRENT_SPRINTS_KEY
    );

    if (savedTimer) {
      const savedElapsed = parseInt(savedTimer);
      setPausedElapsed(savedElapsed);
      setElapsed(savedElapsed);
      setStartTimestamp(Date.now());
    }

    if (savedSprints) {
      try {
        setSprints(JSON.parse(savedSprints));
      } catch {
        localStorage.removeItem(LOCAL_STORAGE_CURRENT_SPRINTS_KEY); // se quebrar o JSON, limpa
      }
    }
  }, []);

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
    localStorage.removeItem(LOCAL_STORAGE_CURRENT_TIMER_KEY);
    localStorage.removeItem(LOCAL_STORAGE_CURRENT_SPRINTS_KEY);
  };

  const handleSaveSprint = () => {
    const newSprint: Sprint = { timeInSeconds: elapsed, meters: poolSize };
    setSprints((prev) => [...prev, newSprint]);
    localStorage.setItem(
      LOCAL_STORAGE_CURRENT_SPRINTS_KEY,
      JSON.stringify([...sprints, newSprint])
    );
    toast.success(`Sprint de ${poolSize}m salvo!`);
  };

  const actualData: Partial<Workout> = {
    date: new Date(
      new Date().setHours(12, 0, 0, 0)
    ).toISOString(),
    fatigueLevel: 5,
    meters: sprints.reduce((acc, sprint) => acc + sprint.meters, 0),
    style: "livre",
    timeInSeconds: elapsed,
  };

  const onSuccessResetTimer = () => {
    resetSprints();
    setResetConfirmModalOpen(false);
    toast.success("Resetado com sucesso!");
  };

  const onSuccessFinishTraining = () => {
    resetSprints();
    setFinishConfirmModalOpen(false);
    toast.success("Treino salvo com sucesso!");
  };

  const handleResetTimer = () => {
    if (isRunning) handlePause();
    setResetConfirmModalOpen(true);
  };

  const handleFinishTraining = () => {
    if (isRunning) handlePause();
    setFinishConfirmModalOpen(true);
  };

  const poolSizeOptions = [25, 50, 75, 100, 125, 150, 200, 250, 300];
  const totalDistance = sprints.reduce((acc, sprint) => acc + sprint.meters, 0);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <>
      <div className="h-screen pt-10">
        <div className="w-full flex flex-col items-center justify-center">
          {/* Pool size buttons */}
          <div className="flex gap-2 mb-4 max-w-[315px] overflow-x-auto pb-3">
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

          <Image src={TimerImage} alt="Timer" width={200} height={200} />

          {/* Timer */}
          <div className="text-5xl font-mono my-6">
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>

          {/* Controls */}
          <div className="flex gap-3 justify-center mb-6 flex-col w-full max-w-[300px]">
            {isRunning ? (
              <Button onClick={handlePause} disabled={finishConfirmModalOpen}>
                Pausar
              </Button>
            ) : (
              <Button onClick={handleStart} disabled={finishConfirmModalOpen}>
                {elapsed === 0 ? "Iniciar treino" : "Continuar"}
              </Button>
            )}

            <Button
              onClick={handleSaveSprint}
              disabled={!isRunning || finishConfirmModalOpen}
              color="gray"
            >
              Completar Sprint
            </Button>

            <Button
              onClick={handleFinishTraining}
              color="green"
              disabled={sprints.length === 0 || finishConfirmModalOpen}
            >
              Finalizar treino
            </Button>

            <Button
              onClick={handleResetTimer}
              variant="outlined"
              color="red"
              disabled={elapsed === 0 || finishConfirmModalOpen}
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
                  <li
                    key={idx}
                    className="text-gray-700 bg-blue-50 p-1 rounded"
                  >
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

      {resetConfirmModalOpen && (
        <ResetConfirmModal
          isOpen={resetConfirmModalOpen}
          onClose={() => setResetConfirmModalOpen(false)}
          onSuccess={onSuccessResetTimer}
        />
      )}

      {finishConfirmModalOpen && (
        <FinishConfirmModal
          isOpen={finishConfirmModalOpen}
          onClose={() => setFinishConfirmModalOpen(false)}
          onSuccess={onSuccessFinishTraining}
          data={actualData}
        />
      )}
    </>
  );
}
