import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import "@/styles/reset.css";
import "@/styles/globals.css";
import { Theme } from "@radix-ui/themes";
import styles from "./layout.module.css";

export const metadata: Metadata = {
	title: "LGTM",
	description: "LGTMを作れるアプリd",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Theme
					appearance="light"
					accentColor="lime"
					grayColor="sand"
					radius="large"
					scaling="100%"
					className={styles["layout-theme"]}
				>
					{children}
				</Theme>
			</body>
		</html>
	);
}
