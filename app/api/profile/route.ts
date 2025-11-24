// app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";

export async function GET(req: NextRequest) {
  const username = req.headers.get("username"); // misal ambil dari localStorage
  if (!username) return NextResponse.json({ error: "Missing username" }, { status: 400 });

  // Ambil data user
  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Ambil bookmark user
  const bookmarks = db.prepare("SELECT * FROM bookmarks WHERE user_id = ?").all(user.id);

  return NextResponse.json({ user, bookmarks });
}
