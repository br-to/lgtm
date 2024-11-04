"use client";

import ImageToast from "@/components/app/top/parts/ImageToast";
import {
	OpenToastContext,
	type OpenToastParams,
	type ToastItem,
} from "@/hooks/useToast";
import { generateRandomId } from "@/utils/generateRandomId";
import * as RadixToast from "@radix-ui/react-toast";
import { type FC, type ReactNode, useCallback, useState } from "react";
import styles from "./ToastProvider.module.css";

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [toasts, setToasts] = useState<ToastItem[]>([]);

	const openToast = useCallback((params: OpenToastParams) => {
		const id = generateRandomId();
		setToasts((prev) => [...prev, { id, isOpen: true, ...params }]);
	}, []);

	const closeToast = useCallback((id: string) => {
		setToasts((prev) =>
			prev.map((value) =>
				value.id === id ? { ...value, isOpen: false } : value,
			),
		);

		setTimeout(() => {
			setToasts((prev) => prev.filter((value) => value.id !== id));
		}, 200);
	}, []);

	return (
		<OpenToastContext.Provider value={openToast}>
			<RadixToast.Provider duration={5000}>
				{children}
				{toasts.map((value) => (
					<ImageToast key={value.id} value={value} onClose={closeToast} />
				))}
				<RadixToast.Viewport className={styles["toast-provider"]} />
			</RadixToast.Provider>
		</OpenToastContext.Provider>
	);
};
