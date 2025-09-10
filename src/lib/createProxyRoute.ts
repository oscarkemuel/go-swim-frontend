import { NextRequest } from "next/server";
import { proxyFetch } from "./proxyFetch";

interface CreateProxyRouteParams {
  prefix: string;
  module: "dashboard" | "workouts";
}

export function createProxyRoute({ prefix, module }: CreateProxyRouteParams) {
  return async function handler(req: NextRequest) {
    const { pathname, searchParams } = req.nextUrl;

    const path = pathname.replace(prefix, "").split("/").filter(Boolean);

    const endpoint = path.length > 0
      ? `/${module}/${path.join("/")}`
      : `/${module}`;

    const url = searchParams.toString()
      ? `${endpoint}?${searchParams.toString()}`
      : endpoint;

    return proxyFetch(req, url);
  };
}
