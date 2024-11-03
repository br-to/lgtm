"use client";

import { searchImages, uploadSearchImage } from "@/utils/supabase";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Grid, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import FileDialog from "../parts/FileDialog";
import FileUpload from "../parts/FileUpload";
import LgtmImage from "../parts/LgtmImage";

import styles from "./SectionTopPage.module.css";

type Props = {
	images?: {
		url: string;
		alt: string;
	}[];
};

const SectionTopPage: FC<Props> = ({ images }) => {
	const [imageUrl, setImageUrl] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const [searchImagesData, setSearchImagesData] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const handleClickImage = (imageUrl: string) => {
		setImageUrl(imageUrl);
		setIsOpen(true);
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	const handlSearch = async () => {
		const result = await searchImages(searchValue);

		if (!result) {
			return null;
		}

		setSearchImagesData(result.images);
	};

	const handleClickSearchImage = async (url: string) => {
		setIsLoading(true);

		// TODO: エラーハンドリング
		const { error } = await uploadSearchImage(url);

		if (error) {
			setIsLoading(false);
			alert("エラーです、アップロードできません");

			return;
		}

		router.refresh();

		setIsLoading(false);
		setSearchImagesData([]);
		setSearchValue("");
	};

	return (
		<Box className={styles["section-top-page"]}>
			<Flex gap="4" direction="column">
				<Flex justify="center" align="center" gap="4">
					<TextField.Root
						placeholder="キーワードで画像検索"
						className={styles["search-input"]}
						size="3"
						onChange={(event) => setSearchValue(event.target.value)}
					>
						<TextField.Slot>
							<MagnifyingGlassIcon height="16" width="16" />
						</TextField.Slot>
					</TextField.Root>
					<Button type="submit" onClick={handlSearch}>
						送信
					</Button>
				</Flex>
				<Flex justify="center">
					<FileUpload />
				</Flex>
			</Flex>
			{searchImagesData && searchImagesData.length > 0 && (
				<Grid
					columns={{
						initial: "1",
						md: "3",
					}}
					gap="4"
					width="100%"
					mb="5"
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
			)}
			{images && images.length > 0 ? (
				<Grid
					columns={{
						initial: "1",
						md: "3",
					}}
					gap="4"
					width="100%"
					mt="5"
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
