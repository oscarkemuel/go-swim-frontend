import { Workout } from "@/models/Workout";

export interface GetAllResponse {
  workouts: (Workout & {
    rhythmPer100m: number;
    rhythmPer50m: number;
  })[];
}

export interface GetByIdResponse {
  workout: Workout & {
    rhythmPer100m: number;
    rhythmPer50m: number;
  };
}