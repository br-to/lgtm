"use client";

import { Box, Flex, Grid, TabNav } from "@radix-ui/themes";
import type { FC } from "react";
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
	return (
		<Box className={styles["section-top-page"]}>
			<Flex justify="center">
				<TabNav.Root>
					<TabNav.Link href="#" active>
						Account
					</TabNav.Link>
					<TabNav.Link href="#">Documents</TabNav.Link>
					<TabNav.Link href="#">Settings</TabNav.Link>
				</TabNav.Root>
			</Flex>
			<Flex justify="center" mt="6">
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
						<LgtmImage key={url} url={url} alt={alt} />
					))}
				</Grid>
			)}
		</Box>
	);
};

export default SectionTopPage;
