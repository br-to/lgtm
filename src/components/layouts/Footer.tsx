import { Flex, Text } from "@radix-ui/themes";
import type { FC } from "react";
import styles from "./Footer.module.css";

const Footer: FC = () => {
	return (
		<footer className={styles["layout-footer"]}>
			<Flex p="4" justify="center">
				<Text>copy right</Text>
			</Flex>
		</footer>
	);
};

export default Footer;
