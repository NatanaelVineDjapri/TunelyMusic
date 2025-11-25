import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, comment } = body;

    if (!id || !comment) {
      return NextResponse.json(
        { message: "ID dan teks comment diperlukan" },
        { status: 400 }
      );
    }

    const updateQuery = db.prepare(
      "UPDATE comments SET comment = ? WHERE id = ?"
    );
    const result = updateQuery.run(comment, id);

    if (result.changes === 0) {
      return NextResponse.json(
        { message: "Comment tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Berhasil diupdate" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
