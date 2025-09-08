import { api } from "@/lib/api";
import { Workout } from "@/models/Workout";
import { GetAllResponse, GetByIdResponse } from "./types";

export const workoutService = {
  getAll: () => api<GetAllResponse>({ url: "/workouts/my" }),
  getById: (id: number) =>
    api<GetByIdResponse>({ url: `/workouts/${id}` }),
  create: (workout: Workout) =>
    api<{ workout: Workout }>({
      url: "/workouts",
      options: { method: "POST", body: JSON.stringify(workout) },
    }),
  update: (id: number, data: Partial<Workout>) =>
    api<{ workout: Workout }>({
      url: `/workouts/${id}`,
      options: { method: "PUT", body: JSON.stringify(data) },
    }),
  delete: (id: number) =>
    api<{ workout: Workout }>({
      url: `/workouts/${id}`,
      options: { method: "DELETE" },
    }),
};
