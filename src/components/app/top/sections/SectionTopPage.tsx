"use client";

import { Box, Flex, Grid, TabNav } from "@radix-ui/themes";
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
	const [isOpen, setIsOpen] = useState(false);

	const handleClickImage = (imageUrl: string) => {
		setImageUrl(imageUrl);
		setIsOpen(true);
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	return (
		<Box className={styles["section-top-page"]}>
			<Flex justify="center">
				<FileUpload />
			</Flex>
			{images && images.length > 0 && (
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
