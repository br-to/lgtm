import { searchImages } from "@/utils/supabase";
import * as Form from "@radix-ui/react-form";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, TextField } from "@radix-ui/themes";
import type { FC, FormEvent, SetStateAction } from "react";
import styles from "./SearchForm.module.css";

type Props = {
	setSearchValues: (value: SetStateAction<string[]>) => void;
};

const SearchForm: FC<Props> = ({ setSearchValues }) => {
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = Object.fromEntries(new FormData(event.currentTarget)) as {
			search: string;
		};
		const result: {
			images: string[];
		} = await searchImages(data.search);

		// TODO: エラーハンドリング
		if (!result) {
			return null;
		}

		setSearchValues(result.images);
	};

	return (
		<Form.Root className={styles["search-form"]} onSubmit={handleSubmit}>
			<Form.Field className={styles["field"]} name="search">
				<Form.Control asChild>
					<TextField.Root
						placeholder="キーワードで画像検索"
						className={styles["input"]}
						size="3"
					>
						<TextField.Slot>
							<MagnifyingGlassIcon height="16" width="16" />
						</TextField.Slot>
					</TextField.Root>
				</Form.Control>
			</Form.Field>
			<Form.Submit asChild>
				<Button type="submit" color="teal" variant="solid" size="3">
					画像検索
				</Button>
			</Form.Submit>
		</Form.Root>
	);
};

export default SearchForm;
