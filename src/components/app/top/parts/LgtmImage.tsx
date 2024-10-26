import { AspectRatio, Button } from "@radix-ui/themes";
import Image from "next/image";
import type { FC } from "react";
import styles from "./LgtmImage.module.css";

type Props = {
	url: string;
	alt: string;
	onClick: () => void;
};

const LgtmImage: FC<Props> = ({ url, alt, onClick }) => {
	return (
		<AspectRatio ratio={4 / 3} className={styles["lgtm-image"]}>
			<Button onClick={onClick} className={styles["button"]}>
				<Image
					src={url}
					alt={alt}
					style={{
						objectFit: "cover",
						width: "100%",
						height: "100%",
					}}
					fill
					sizes="100vw"
				/>
			</Button>
		</AspectRatio>
	);
};

export default LgtmImage;
