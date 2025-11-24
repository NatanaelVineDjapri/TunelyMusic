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

  const user = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);

  if (!user) {
    return new Response(JSON.stringify({ error: "User tidak ditemukan" }), {
      status: 404,
    });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return new Response(JSON.stringify({ error: "Password salah" }), {
      status: 401,
    });
  }
  return new Response(
    JSON.stringify({
      message: "Login sukses",
      id: user.id,
      username: user.username,
    }),
    { status: 200 }
  );
}
