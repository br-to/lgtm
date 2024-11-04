import { type ReactNode, createContext, useContext } from "react";

export type ToastItem = {
	id: string;
	type: "success" | "error";
	title: ReactNode;
	description?: ReactNode;
	duration?: number;
	isOpen: boolean;
};

export type OpenToastParams = Omit<ToastItem, "id" | "isOpen">;

export const OpenToastContext = createContext<
	(params: OpenToastParams) => void
>(() => null);

export const useToast = () => {
	return useContext(OpenToastContext);
};
