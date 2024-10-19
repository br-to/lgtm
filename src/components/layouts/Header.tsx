import { Flex, Heading } from "@radix-ui/themes";
import type { FC } from "react";
import styles from "./Header.module.css";

const Header: FC = () => {
	return (
		<header className={styles["layout-header"]}>
			<Flex justify="between" p="5" height="80px">
				<Heading>lgtm app</Heading>
			</Flex>
		</header>
	);
};

export default Header;
