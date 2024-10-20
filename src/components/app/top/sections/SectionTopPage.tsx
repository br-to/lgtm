import { Box, Flex, Grid, TabNav } from "@radix-ui/themes";
import type { FC } from "react";
import LgtmImage from "../parts/LgtmImage";
import styles from "./SectionTopPage.module.css";

const SectionTopPage: FC = () => {
	const images = [
		{
			url: "https://lgtm-images.lgtmeow.com/2024/09/26/11/c4805315-3e25-4977-973c-4822e2852027.webp",
			alt: "test1",
		},
		{
			url: "https://lgtm-images.lgtmeow.com/2024/09/26/11/c4805315-3e25-4977-973c-4822e2852027.webp",
			alt: "test1",
		},
		{
			url: "https://lgtm-images.lgtmeow.com/2024/09/26/11/c4805315-3e25-4977-973c-4822e2852027.webp",
			alt: "test1",
		},
		{
			url: "https://lgtm-images.lgtmeow.com/2024/09/26/11/c4805315-3e25-4977-973c-4822e2852027.webp",
			alt: "test1",
		},
		{
			url: "https://lgtm-images.lgtmeow.com/2024/09/26/11/c4805315-3e25-4977-973c-4822e2852027.webp",
			alt: "test1",
		},
	];

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
