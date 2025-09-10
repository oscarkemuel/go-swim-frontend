import { NextRequest } from "next/server";
import { createProxyRoute } from "@/lib/createProxyRoute";

const workoutProxy = createProxyRoute({ prefix: "/api/workouts", module: "workouts" });

export async function GET(req: NextRequest) {
  return workoutProxy(req);
}

export async function DELETE(req: NextRequest) {
  return workoutProxy(req);
}
