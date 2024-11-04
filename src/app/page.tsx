import SectionTopPage from "@/components/app/top/sections/SectionTopPage";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { SUPABASE } from "@/constants/supabase";
import { fetchImages } from "@/utils/supabase";
import styles from "./page.module.css";

export const revalidate = 0;

const Page = async () => {
	const { imagesData, error } = await fetchImages();

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
		<div className={styles["top-page"]}>
			<Header />
			<main className={styles["main"]}>
				<SectionTopPage images={images} />
			</main>
			<Footer />
		</div>
	);
};

export default Page;
