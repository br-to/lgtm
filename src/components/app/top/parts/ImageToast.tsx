import type { ToastItem } from "@/hooks/useToast";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import * as RadixToast from "@radix-ui/react-toast";
import type { FC } from "react";
import styles from "./ImageToast.module.css";

const ImageToast: FC<{
	value: ToastItem;
	onClose: (id: string) => void;
}> = ({ value, onClose }) => {
	return (
		<RadixToast.Root
			open={value.isOpen}
			onOpenChange={(isOpen) => !isOpen && onClose(value.id)}
			duration={value.duration}
			className={styles["image-toast"]}
		>
			{value.type === "success" ? (
				<CheckCircledIcon color="green" />
			) : (
				<CrossCircledIcon color="red" />
			)}
			<RadixToast.Title className={styles["title"]}>
				{value.title}
			</RadixToast.Title>
			{value.description && (
				<RadixToast.Description className={styles["description"]}>
					{value.description}
				</RadixToast.Description>
			)}
		</RadixToast.Root>
	);
};

export default ImageToast;
