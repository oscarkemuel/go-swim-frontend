import { ApiResponseWithPagination } from "@/lib/api";
import { Workout } from "@/models/Workout";

export interface GetAllResponse extends ApiResponseWithPagination {
  items: (Workout & {
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