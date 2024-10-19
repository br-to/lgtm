import SectionTopPage from "@/components/app/top/sections/SectionTopPage";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import styles from "./page.module.css";

export default function Home() {
	return (
		<div className={styles["top-page"]}>
			<Header />
			<main className={styles["main"]}>
				<SectionTopPage />
			</main>
			<Footer />
		</div>
	);
}
