import { SUPABASE } from "@/constants/supabase";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {});

// 画像の取得
export const fetchImages = async () => {
	const { data, error } = await supabase.storage
		.from(SUPABASE.BUCKET_NAME)
		.list(SUPABASE.DIRECTORY, {
			limit: 100,
			offset: 0,
			sortBy: { column: "created_at", order: "desc" },
		});

	return {
		imagesData: data,
		error,
	};
};

// 画像のアップロード
export const uploadImage = async (file: File) => {
	const { data, error } = await supabase.storage
		.from(SUPABASE.BUCKET_NAME)
		.upload(
			`${SUPABASE.DIRECTORY}/${uuidv4()}.${file.name?.split(".").at(-1)}`,
			file,
		);

	// TODO: エラーハンドリング
	if (error) {
		console.error(error);
		return;
	}

	return {
		uploadImageData: data,
	};
};
