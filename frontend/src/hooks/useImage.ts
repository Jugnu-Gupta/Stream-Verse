import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import { validateImageSize } from "../utils/ValidateImageSize";

export const useImage = (setAddTweetText: Dispatch<SetStateAction<string>>) => {
	const [imagePreview, setImagePreview] = useState<string>("");
	const [newTweetImage, setNewTweetImage] = useState<File | null>();
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		fileSize: number
	) => {
		validateImageSize(e, fileSize);
		const file = e.target.files?.[0];
		if (!file) return;
		setNewTweetImage(file);
		setImagePreview(URL.createObjectURL(file));
	};

	const handleCancelClick = () => {
		setAddTweetText("");
		setNewTweetImage(null);
		setImagePreview("");

		// Clear the file input
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	useEffect(() => {
		return () => {
			if (imagePreview) {
				URL.revokeObjectURL(imagePreview);
			}
		};
	}, [imagePreview]);

	return {
		fileInputRef,
		imagePreview,
		setImagePreview,
		newTweetImage,
		setNewTweetImage,
		handleImageChange,
		handleCancelClick,
	};
};
