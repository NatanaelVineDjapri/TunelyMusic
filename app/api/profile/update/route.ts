import { NextRequest } from "next/server";
import { db } from "@/db/db";

export async function POST(req: NextRequest) {
  try {
    const { oldUsername, newUsername } = await req.json();

    if (!oldUsername || !newUsername) {
      return new Response(
        JSON.stringify({ message: "Username lama dan baru dibutuhkan" }),
        { status: 400 }
      );
    }

    const user = db
      .prepare("SELECT id FROM users WHERE username = ?")
      .get(oldUsername);
    if (!user)
      return new Response(JSON.stringify({ message: "User tidak ditemukan" }), {
        status: 404,
      });

    db.prepare("UPDATE users SET username = ? WHERE id = ?").run(
      newUsername,
      user.id
    );

    return new Response(
      JSON.stringify({ message: "Profile berhasil diupdate", newUsername }),
      { status: 200 }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
