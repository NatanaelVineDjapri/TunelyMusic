import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";

export async function GET(
  req: NextRequest,
  // Perhatikan tipe data di sini: params adalah Promise
  { params }: { params: Promise<{ trackId: string }> } 
) {
  // 1. Lakukan await pada params sebelum mengambil property-nya
  const { trackId } = await params; 

  console.log("Params resolved:", trackId); // Debug

  if (!trackId) {
    return NextResponse.json({ message: "trackId missing" }, { status: 400 });
  }

  try {
    const comments = db.prepare(
      `SELECT c.id, u.username, c.comment, c.track_id, c.created_at
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.track_id = ?`
    ).all(trackId);

    return NextResponse.json({ comments }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}