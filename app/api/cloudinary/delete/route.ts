import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json({ error: "No publicId provided" }, { status: 400 });
    }

    // Xóa ảnh trên Cloudinary
    const deleteResponse = await cloudinary.uploader.destroy(publicId);

    if (deleteResponse.result !== "ok") {
      throw new Error("Failed to delete image");
    }

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
