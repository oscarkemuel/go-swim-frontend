"use client";

import { useWorkouts } from "@/hooks/useWorkouts";
import { formatDate, formatTime, formatTimeToMinutes } from "@/utils";
import Pagination from "rc-pagination";
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { Workout } from "@/models/Workout";
import { Button } from "@/components/lib/Button";
import DeleteWorkoutModal from "../DeleteWorkoutModal";
import Loading from "./loading";
import { usePagination } from "@/hooks/usePaginations";

export function WorkoutTable() {
  const { page, setPage, limit, setLimit } = usePagination();
  const { getMyWorkouts } = useWorkouts();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    workout: Workout | null;
  }>({
    isOpen: false,
    workout: null,
  });

  const workouts = getMyWorkouts();

  if (workouts.isLoading || workouts.isFetching) return <Loading />;

  const data = workouts.data?.items || [];

  if (data.length === 0 && !workouts.isLoading && !workouts.isFetching) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Nenhum treino registrado ainda.
      </div>
    );
  }

  const handleDelete = (workout: Workout) => {
    setDeleteModal({
      isOpen: true,
      workout,
    });
  };

  const handleCloseModal = () => {
    setDeleteModal({
      isOpen: false,
      workout: null,
    });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className="mb-2 flex items-center gap-4 justify-end">
          <Pagination
            current={page}
            pageSize={limit}
            total={workouts.data?.meta.totalItems}
            align="end"
            onChange={(page) => {
              setPage(page);
            }}
          />

          <div>
            <select
              name="limit"
              id="limit"
              value={limit}
              onChange={(e) => {
                setPage(1);
                setLimit(Number(e.target.value));
              }}
              className="border border-gray-300 rounded-md p-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        <div className="max-sm:block hidden">
          {data.map((w) => (
            <div
              key={w.id}
              className="bg-white shadow-md rounded-lg p-4 mb-4 hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-center mb-2 gap-4">
                <div>
                  <div className="text-lg font-medium text-gray-900">
                    {w.meters}m
                    <span className="text-sm text-gray-500">
                      {" "}
                      - {formatDate(w.date)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Duração: {formatTime(w.timeInSeconds)} | Ritmo (50m):{" "}
                    {w.rhythmPer50m ? formatTime(w.rhythmPer50m, true) : "N/A"}{" "}
                    | Ritmo (100m):{" "}
                    {w.rhythmPer100m
                      ? formatTime(w.rhythmPer100m, true)
                      : "N/A"}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDelete(w)}
                    color="red"
                    variant="icon"
                  >
                    <MdDelete size={18} />
                  </Button>
                  <Link href={`/workouts/${w.id}/`}>
                    <Button onClick={() => {}} color="gray" variant="icon">
                      <FaArrowRight size={18} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="inline-block max-sm:hidden w-full">
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
                    {w.rhythmPer100m
                      ? formatTime(w.rhythmPer100m, true)
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        onClick={() => handleDelete(w)}
                        color="red"
                        variant="icon"
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
      </div>

      {deleteModal.workout && (
        <DeleteWorkoutModal
          isOpen={deleteModal.isOpen}
          onClose={handleCloseModal}
          workout={deleteModal.workout}
          onSuccess={() => {
            handleCloseModal();
            toast.success("Treino deletado com sucesso!");
            workouts.refetch();
          }}
        />
      )}
    </>
  );
}
