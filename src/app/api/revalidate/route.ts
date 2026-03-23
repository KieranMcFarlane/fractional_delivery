import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type RevalidateBody = {
  secret?: string;
  path?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as RevalidateBody;
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || body.secret !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const path = body.path || "/";
  revalidatePath(path);

  return NextResponse.json({ ok: true, revalidated: path });
}
