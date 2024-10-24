import { uploadImage } from "@/utils/supabase";
import { Button, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import type { ChangeEvent, FC } from "react";
import styles from "./FileUpload.module.css";

const FileUpload: FC = () => {
	const router = useRouter();

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const file = event.target.files?.[0];

		if (!file) return;

		// TODO: エラーハンドリング
		await uploadImage(file);

		router.refresh();
	};

	return (
		<Button className={styles["file-upload"]}>
			<Text>ファイルアップロード</Text>
			<input
				type="file"
				accept="image/*"
				autoComplete="off"
				tabIndex={-1}
				className={styles["file"]}
				onChange={handleFileChange}
			/>
		</Button>
	);
};

export default FileUpload;
