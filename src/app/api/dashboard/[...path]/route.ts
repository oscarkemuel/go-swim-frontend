import { NextRequest } from "next/server";
import { createProxyRoute } from "@/lib/createProxyRoute";

const dashboardProxy = createProxyRoute({ prefix: "/api/dashboard", module: "dashboard" });

export async function GET(req: NextRequest) {
  return dashboardProxy(req);
}

export async function POST(req: NextRequest) {
  return dashboardProxy(req);
}
