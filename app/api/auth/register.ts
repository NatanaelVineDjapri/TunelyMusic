import type { NextRequest } from "next/server";
import { db } from "@/db/db";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return new Response(
      JSON.stringify({ error: "Username dan password dibutuhkan" }),
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const stmt = db.prepare(
      "INSERT INTO users (username, password) VALUES (?, ?)"
    );
    const info = stmt.run(username, hashedPassword);
    return new Response(
      JSON.stringify({
        message: "User berhasil dibuat",
        id: info.lastInsertRowid,
      }),
      { status: 201 }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
    });
  }
}
