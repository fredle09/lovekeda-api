import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  const formData = await request.formData();
  console.log(formData);
  const files = formData.getAll("file") as File[];
  const folder = formData.get("folder")?.toString() || "";
  console.log(files);

  try {
    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploadPromises = files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
        folder: folder ? `lovekeda/${folder}` : "temp",
      });

      return uploadResponse.secure_url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);

    return NextResponse.json({
      urls: uploadedUrls,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ files: files, folder: folder, error: "Upload failed", detail: error }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    // Respond with the uploaded file URL
    return NextResponse.json({
      "success": "Get thành công"
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}