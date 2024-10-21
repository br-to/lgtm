import { SUPABASE } from "@/constants/supabase";
import { fetchImages, supabase } from "@/utils/supabase";
import { Box, Flex, Grid, TabNav } from "@radix-ui/themes";
import LgtmImage from "../parts/LgtmImage";
import styles from "./SectionTopPage.module.css";

const SectionTopPage = async () => {
	const { imagesData, error } = await fetchImages();

	// TODO: エラーハンドリング
	if (error) {
		return null;
	}

	const images =
		(imagesData &&
			imagesData.length > 0 &&
			imagesData
				.filter(({ name }) => name !== ".emptyFolderPlaceholder")
				.map(({ name }) => ({
					url: `${SUPABASE.IMAGE_URL}${name}`,
					alt: name.split(".")[0],
				}))) ||
		undefined;

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
