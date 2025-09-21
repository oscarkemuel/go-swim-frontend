import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await fetch(`${process.env.API_URL}/auth/sign-in/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": req.headers.get("user-agent") || "custom-agent",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const data = await res.json();

  const response = NextResponse.json(
    {
      status: res.status,
      data,
    },
    { status: res.status, headers: res.headers, statusText: res.statusText }
  );

  return response;
}
