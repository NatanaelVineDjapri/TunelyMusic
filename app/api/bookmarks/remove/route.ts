import { NextRequest } from "next/server";
import { db } from "@/db/db";

export async function POST(req: NextRequest) {
  const { trackId, username } = await req.json();

  if (!trackId || !username) {
    return new Response(
      JSON.stringify({ message: "trackId dan username dibutuhkan" }),
      { status: 400 }
    );
  }

  try {
    const user = db
      .prepare("SELECT id FROM users WHERE username = ?")
      .get(username);
    if (!user) throw new Error("User tidak ditemukan");

    db.prepare("DELETE FROM bookmarks WHERE user_id = ? AND track_id = ?").run(
      user.id,
      trackId
    );

    return new Response(
      JSON.stringify({ message: "Bookmark berhasil dihapus" }),
      { status: 200 }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 400,
    });
  }
}
