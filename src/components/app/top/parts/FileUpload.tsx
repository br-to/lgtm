import { useToast } from "@/hooks/useToast";
import { uploadImage } from "@/utils/supabase";
import { Button, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { type ChangeEvent, type FC, useRef, useState } from "react";
import styles from "./FileUpload.module.css";

const FileUpload: FC = () => {
	const inputFileRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const openToast = useToast();

	const handleButtonClick = () => {
		inputFileRef.current?.click();
	};

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		setIsLoading(true);
		const file = event.target.files?.[0];

		if (!file) return;

		const { error } = await uploadImage(file);

		if (error) {
			setIsLoading(false);
			openToast({
				type: "error",
				title:
					"LGTM画像を作成できませんでした。時間をおいて再度実行してください。",
				duration: 3000,
			});

			return;
		}

		router.refresh();
		setIsLoading(false);
		openToast({
			type: "success",
			title: "LGTM画像を作成しました!",
			duration: 3000,
		});
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
