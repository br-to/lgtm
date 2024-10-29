import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import sharp from "sharp";

export const POST = async (request: Request): Promise<Response> => {
	const formData = await request.formData();
	const uploadedFile = formData.get("file") as Blob | null;

	if (!uploadedFile) {
		return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
	}

	// アップロードされた画像をバッファに変換
	const uploadedImageBuffer = Buffer.from(await uploadedFile.arrayBuffer());

	// public フォルダからロゴ画像を読み込み
	const logoPath = path.join(process.cwd(), "public", "logo.png");
	const logoBuffer = fs.readFileSync(logoPath);

	try {
		// Sharpで画像を結合
		const mergedImageBuffer = await sharp(uploadedImageBuffer)
			.composite([
				{
					input: logoBuffer,
					top: 100,
					left: 100,
				},
			])
			.png()
			.toBuffer();

		// 画像データを返す
		return new Response(mergedImageBuffer, {
			headers: {
				"Content-Type": "image/png",
			},
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Error processing images" },
			{ status: 500 },
		);
	}
};
