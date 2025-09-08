import { GetByIdResponse } from "@/services/workoutService/types";
import { formatDate, formatTime, formatTimeToMinutes } from "@/utils";
import { UseQueryResult } from "@tanstack/react-query";
import Loading from "./loading";

interface WorkoutInfosContentProps {
  query: UseQueryResult<GetByIdResponse, unknown>
}

export default function WorkoutInfosContent({ query }: WorkoutInfosContentProps) {
  const { data, isLoading, isError, isFetching } = query;

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError || !data) {
    return <div className="text-center py-6 text-red-500">Erro ao carregar informações do treino.</div>;
  }

  const workout = data.workout;

  return (
    <div className="w-full p-6 rounded-[10px] border-[#F3F6FD] border-1 flex-1 shadow">
      <h2 className="text-xl font-bold mb-6 text-[#06152b]">Detalhes do Treino</h2>

      <div className="grid gap-4">
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Data</span>
          <span className="font-medium">{formatDate(workout.date)}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Distância</span>
          <span className="font-medium">{workout.meters} m</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Tempo</span>
          <span className="font-medium">{formatTime(workout.timeInSeconds)}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Ritmo / 50m</span>
          <span className="font-medium">{formatTime(workout.rhythmPer50m)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Ritmo / 100m</span>
          <span className="font-medium">{formatTime(workout.rhythmPer100m)}</span>
        </div>
      </div>
    </div>
  );
}
