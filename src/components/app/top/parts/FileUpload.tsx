import { uploadImage } from "@/utils/supabase";
import { Button, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { type ChangeEvent, type FC, useRef, useState } from "react";
import styles from "./FileUpload.module.css";

const FileUpload: FC = () => {
	const inputFileRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const handleButtonClick = () => {
		inputFileRef.current?.click();
	};

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		setIsLoading(true);
		const file = event.target.files?.[0];

		if (!file) return;

		// TODO: エラーハンドリング
		const { error } = await uploadImage(file);

		if (error) {
			setIsLoading(false);
			alert("エラーです、アップロードできません");

			return;
		}

		router.refresh();

		setIsLoading(false);
	};

	return (
		<Button
			className={styles["file-upload"]}
			color="teal"
			variant="solid"
			size="3"
			onClick={handleButtonClick}
			loading={isLoading}
		>
			<Text>ファイルアップロード</Text>
			<input
				type="file"
				accept="image/*"
				autoComplete="off"
				tabIndex={-1}
				className={styles["file"]}
				onChange={handleFileChange}
				ref={inputFileRef}
			/>
		</Button>
	);
};

export default FileUpload;
