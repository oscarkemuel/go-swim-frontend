import { api } from "@/lib/api";
import { Workout } from "@/models/Workout";
import { GetAllResponse, GetByIdResponse } from "./types";

export const workoutService = {
  getAll: () => api<GetAllResponse>({ url: "/workouts/my" }).then(res => res.data),
  getById: (id: number) =>
    api<GetByIdResponse>({ url: `/workouts/${id}` }).then(res => res.data),
  create: (workout: Partial<Workout>) =>
    api({
      url: "/workouts",
      options: { method: "POST", body: JSON.stringify(workout) },
    }),
  update: (id: number, data: Partial<Workout>) =>
    api<{ workout: Workout }>({
      url: `/workouts/${id}`,
      options: { method: "PUT", body: JSON.stringify(data) },
    }),
  delete: (id: number) =>
    api({
      url: `/workouts/${id}`,
      options: { method: "DELETE" },
    })
};
