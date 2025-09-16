import { NextRequest } from "next/server";
import { createProxyRoute } from "@/lib/createProxyRoute";

const achievementProxy = createProxyRoute({ prefix: "/api/achievements", module: "achievements" });

export async function GET(req: NextRequest) {
  return achievementProxy(req);
}

