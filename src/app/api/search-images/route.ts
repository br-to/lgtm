import { customsearch } from "@googleapis/customsearch";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const keyword = searchParams.get("keyword");

	if (!keyword) {
		return NextResponse.json({ error: "Query is required" }, { status: 400 });
	}

	const customSearch = customsearch("v1");

	const API_KEY = process.env.GOOGLE_API_KEY;
	const GOOGLE_ID = process.env.GOOGLE_ID;

	try {
		const result = await customSearch.cse.list({
			auth: API_KEY,
			cx: GOOGLE_ID,
			q: keyword,
			num: 9,
		});

		const images = result.data.items
			?.map(({ pagemap }) =>
				pagemap?.cse_image && pagemap?.cse_image.length > 0
					? pagemap?.cse_image[0]?.src
					: undefined,
			)
			.filter(
				(value: string) =>
					value?.startsWith("https") || value?.startsWith("http"),
			) as string[];

		return NextResponse.json({ images });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error }, { status: 500 });
	}
};
