import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((c) => cookieStore.delete(c.name));

  return NextResponse.json(
    { message: "Logout successful" },
    { status: 200 }
  );
}
