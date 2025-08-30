"use client";

import { useWorkouts } from "@/hooks/useWorkouts";
import Skeleton from "react-loading-skeleton";

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function WorkoutTable() {
  const { workouts, remove } = useWorkouts();

  if (workouts.isLoading || workouts.isFetching) return <Skeleton count={10} height={40} />;

  const sortedWorkouts = [...(workouts.data?.workouts || [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Distância (m)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duração
            </th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedWorkouts.map((w) => (
            <tr key={w.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{w.meters}m</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {new Date(w.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatTime(w.timeInSeconds)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                <button
                  onClick={() => remove.mutate(w.id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
