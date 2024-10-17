import type { FC } from "react";
import styles from "./Test.module.css";

const Test: FC = () => {
	return <h2 className={styles["test-title"]}>title</h2>;
};

export default Test;
