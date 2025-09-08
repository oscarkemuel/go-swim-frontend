import { Workout } from "@/models/Workout";
import { workoutService } from "@/services/workoutService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UpdateWorkoutInput {
  id: number;
  data: Partial<Workout>;
}

export function useWorkouts() {
  const queryClient = useQueryClient();

  const workouts = useQuery({
    queryKey: ["workouts"],
    queryFn: () => workoutService.getAll(),
  })

  const getWorkoutById = (id: number) => {
    return useQuery({
      queryKey: ["workout", id],
      queryFn: () => workoutService.getById(id),
      enabled: !!id,
      refetchOnWindowFocus: false,
    });
  }

  const create = useMutation({
    mutationFn: workoutService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    }
  })

  const update = useMutation({
    mutationFn: ({ id, data }: UpdateWorkoutInput) => workoutService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    }
  })

  const remove = useMutation({
    mutationFn: workoutService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    }
  })

  return { workouts, getWorkoutById, create, update, remove };
}