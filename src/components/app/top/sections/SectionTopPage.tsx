import { Box, Flex, TabNav } from "@radix-ui/themes";
import type { FC } from "react";
import styles from "./SectionTopPage.module.css";

const SectionTopPage: FC = () => {
	return (
		<Box>
			<Flex justify="center">
				<TabNav.Root>
					<TabNav.Link href="#" active>
						Account
					</TabNav.Link>
					<TabNav.Link href="#">Documents</TabNav.Link>
					<TabNav.Link href="#">Settings</TabNav.Link>
				</TabNav.Root>
			</Flex>
			画像一覧
		</Box>
	);
};

export default SectionTopPage;
