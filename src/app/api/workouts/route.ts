import { NextRequest } from "next/server";
import { createProxyRoute } from "@/lib/createProxyRoute";

const workoutProxy = createProxyRoute({ prefix: "/api/workouts", module: "workouts" });

export async function POST(req: NextRequest) {
  return workoutProxy(req);
}
