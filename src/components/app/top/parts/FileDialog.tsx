import { Cross2Icon } from "@radix-ui/react-icons";
import { AspectRatio, Button, Dialog, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { type FC, useEffect, useRef } from "react";
import styles from "./FileDialog.module.css";

type Props = {
	isOpen: boolean;
	imageUrl: string;
	onClose: () => void;
};

const FileDialog: FC<Props> = ({ isOpen, imageUrl, onClose }) => {
	const dialogRef = useRef(null);

	// モーダルの外側をクリックした場合の考慮
	const handleClickOutside = (event: MouseEvent) => {
		if (
			dialogRef.current &&
			!(dialogRef.current as HTMLElement).contains(event.target as Node)
		) {
			onClose();
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<Dialog.Root open={isOpen}>
			<Dialog.Content
				maxWidth="600px"
				ref={dialogRef}
				className={styles["file-dialog"]}
			>
				<Dialog.Title hidden />
				<Dialog.Description hidden />
				<Flex gap="3" mb="4" justify="end" className={styles["button"]}>
					<Button className={styles["close"]} onClick={onClose}>
						<Cross2Icon width="20" height="20" />
					</Button>
				</Flex>
				<AspectRatio ratio={4 / 3}>
					<Image fill src={imageUrl} alt="" />
				</AspectRatio>
				<Flex gap="3" mt="4" direction="column">
					<Text color="green" size="1">
						LGTM URL
					</Text>
					<Text as="p">{`![LGTM](${imageUrl})`}</Text>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};

export default FileDialog;
