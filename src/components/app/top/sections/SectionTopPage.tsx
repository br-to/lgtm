"use client";

import { uploadSearchImage } from "@/utils/supabase";
import { Box, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import FileDialog from "../parts/FileDialog";
import FileUpload from "../parts/FileUpload";
import LgtmImage from "../parts/LgtmImage";
import SearchForm from "../parts/SearchForm";

import styles from "./SectionTopPage.module.css";

type Props = {
	images?: {
		url: string;
		alt: string;
	}[];
};

const SectionTopPage: FC<Props> = ({ images }) => {
	const [imageUrl, setImageUrl] = useState("");
	const [searchImagesData, setSearchImagesData] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	const router = useRouter();

	const handleClickImage = (imageUrl: string) => {
		setImageUrl(imageUrl);
		setIsOpen(true);
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	const handleClickSearchImage = async (url: string) => {
		// TODO: エラーハンドリング
		const { error } = await uploadSearchImage(url);

		if (error) {
			alert("エラーです、アップロードできません");

			return;
		}

		router.refresh();

		setSearchImagesData([]);
	};

	return (
		<Box className={styles["section-top-page"]}>
			<Flex gap="4" justify="end">
				<Flex justify="center">
					<SearchForm setSearchValues={setSearchImagesData} />
				</Flex>
				<Flex justify="center">
					<FileUpload />
				</Flex>
			</Flex>
			{searchImagesData && searchImagesData.length > 0 && (
				<>
					<Heading>画像検索結果からLGTM画像の生成</Heading>
					<Grid
						columns={{
							initial: "1",
							md: "3",
						}}
						gap="4"
						width="100%"
						mb="9"
						mt="5"
					>
						{searchImagesData.map((image) => (
							<LgtmImage
								key={image}
								url={image}
								alt=""
								onClick={() => handleClickSearchImage(image)}
							/>
						))}
					</Grid>
					<Separator size="4" color="teal" />
				</>
			)}
			{images && images.length > 0 ? (
				<Grid
					columns={{
						initial: "1",
						md: "3",
					}}
					gap="4"
					width="100%"
					mt={searchImagesData && searchImagesData.length > 0 ? "9" : "5"}
				>
					{images.map(({ url, alt }) => (
						<LgtmImage
							key={url}
							url={url}
							alt={alt}
							onClick={() => handleClickImage(url)}
						/>
					))}
				</Grid>
			) : (
				<Flex mt="8" justify="center">
					<Text>画像をアップロードしてください</Text>
				</Flex>
			)}
			<FileDialog
				imageUrl={imageUrl}
				isOpen={isOpen}
				onClose={handleCloseDialog}
			/>
		</Box>
	);
};

export default SectionTopPage;
