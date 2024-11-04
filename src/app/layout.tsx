import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import "@/styles/reset.css";
import "@/styles/globals.css";
import { ToastProvider } from "@/provider/ToastProvider";
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
			<head>
				<script
					async
					src="https://cse.google.com/cse.js?cx=03ba4cba97a1e46f5"
				/>
			</head>
			<body>
				<Theme
					appearance="light"
					accentColor="lime"
					grayColor="sand"
					radius="large"
					scaling="100%"
					className={styles["layout-theme"]}
				>
					<ToastProvider>{children}</ToastProvider>
				</Theme>
			</body>
		</html>
	);
}
