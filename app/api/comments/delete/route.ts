import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";

export async function DELETE(req: NextRequest) {
  try {
    // Ambil ID dari body JSON
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "ID comment diperlukan" }, { status: 400 });
    }

    // Eksekusi Query Delete
    const deleteQuery = db.prepare("DELETE FROM comments WHERE id = ?");
    const result = deleteQuery.run(id);

    if (result.changes === 0) {
      return NextResponse.json({ message: "Comment tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ message: "Berhasil dihapus" }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}