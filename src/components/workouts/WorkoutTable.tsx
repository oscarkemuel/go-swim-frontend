"use client";

import { useWorkouts } from "@/hooks/useWorkouts";
import { formatDate, formatTime, formatTimeToMinutes } from "@/utils";
import Skeleton from "react-loading-skeleton";
import { Button } from "../lib/Button";
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";

export function WorkoutTable() {
  const { getMyWorkouts, remove } = useWorkouts();

  const workouts = getMyWorkouts();

  if (workouts.isLoading || workouts.isFetching)
    return <Skeleton count={10} height={40} />;

  const data = workouts.data?.workouts || [];

  if (data.length === 0 && !workouts.isLoading && !workouts.isFetching) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Nenhum treino registrado ainda.
      </div>
    );
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja deletar este treino?")) {
      remove.mutate(id, {
        onSuccess: () => {
          toast.success("Treino deletado com sucesso!");
          workouts.refetch();
        },
      });
    }
  };

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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ritmo (50m)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ritmo (100m)
            </th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((w) => (
            <tr key={w.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {w.meters}m
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatDate(w.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatTime(w.timeInSeconds)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {w.rhythmPer50m ? formatTime(w.rhythmPer50m, true) : "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {w.rhythmPer100m ? formatTime(w.rhythmPer100m, true) : "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    onClick={() => handleDelete(w.id)}
                    color="red"
                    variant="icon"
                    disabled={remove.isPending}
                  >
                    <MdDelete size={18} />
                  </Button>

                  <Link href={`/workouts/${w.id}/`}>
                    <Button onClick={() => {}} color="gray" variant="icon">
                      <FaArrowRight size={18} />
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
