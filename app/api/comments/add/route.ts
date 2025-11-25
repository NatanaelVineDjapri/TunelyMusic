import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";

export async function POST(req: NextRequest) {
  try {
    const { trackId, username, comment } = await req.json();

    if (!trackId || !username || !comment) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const user = db
      .prepare("SELECT id FROM users WHERE username = ?")
      .get(username);
    if (!user)
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 400 }
      );

    db.prepare(
      "INSERT INTO comments (user_id, track_id, comment) VALUES (?, ?, ?)"
    ).run(user.id, trackId, comment);

    return NextResponse.json(
      { message: "Comment berhasil ditambahkan" },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
