import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const response = NextResponse.json({ success: true }, { status: 200 });

  response.cookies.delete("auth_token");

  return response;
}
