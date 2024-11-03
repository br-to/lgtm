import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import sharp from "sharp";

export const POST = async (request: Request): Promise<Response> => {
	const { url } = await request.json();
	console.log(url, "hello");

	if (!url) {
		return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
	}

	// URLから画像データを取得
	const response = await fetch(url);
	console.log(response);
	if (!response.ok) {
		throw new Error(`画像を取得できませんでした: ${response.statusText}`);
	}

	// アップロードされた画像をバッファに変換
	const uploadedImageBuffer = Buffer.from(await response.arrayBuffer());

	// public フォルダからロゴ画像を読み込み
	const logoPath = path.join(process.cwd(), "public", "logo.png");
	const logoBuffer = fs.readFileSync(logoPath);

	try {
		// Sharpで画像を結合
		const mergedImageBuffer = await sharp(uploadedImageBuffer)
			.composite([
				{
					input: logoBuffer,
				},
			])
			.sharpen()
			.toBuffer();

		// 画像データを返す
		return new Response(mergedImageBuffer, {
			headers: {
				"Content-Type": "image/*",
			},
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Error processing images" },
			{ status: 500 },
		);
	}
};
