import { AspectRatio } from "@radix-ui/themes";
import Image from "next/image";
import type { FC } from "react";
import styles from "./LgtmImage.module.css";

type Props = {
	url: string;
	alt: string;
};

const LgtmImage: FC<Props> = ({ url, alt }) => {
	return (
		<AspectRatio ratio={4 / 3} className={styles["lgtm-image"]}>
			<Image
				src={url}
				alt={alt}
				style={{
					objectFit: "cover",
					width: "100%",
					height: "100%",
				}}
				fill
			/>
		</AspectRatio>
	);
};

export default LgtmImage;
