import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

export const useImage = (setText?: Dispatch<SetStateAction<string>>) => {
	const [imagePreview, setImagePreview] = useState<string>("");
	const [newImage, setNewImage] = useState<File | null>();
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		fileSize: number
	) => {
		if (e.target.files![0].size > fileSize) {
			// fileSize is in Bytes
			console.error("Image size should not exceed 1 MB");
			toast.error("File size should not exceed 1 MB");

			const file = e.target.files?.[0];
			if (!file) return;
			setNewImage(file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	const discardImageChange = () => {
		if (setText) setText("");
		setNewImage(null);
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
		newImage,
		setNewImage,
		handleImageChange,
		discardImageChange,
	};
};
