import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import validateMediaSize from "../utils/ValidateMediaSize";

const useMedia = (setText?: Dispatch<SetStateAction<string>>) => {
	const [mediaPreview, setMediaPreview] = useState<string>("");
	const [newMedia, setNewMedia] = useState<File | null>();
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleMediaChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		fileSize: number
	) => {
		if (e.target.files && validateMediaSize(e.target.files, fileSize)) {
			const file = e.target.files?.[0];
			if (!file) return;
			setNewMedia(file);
			setMediaPreview(URL.createObjectURL(file));
		}
	};

	const discardMediaChange = () => {
		if (setText) setText("");
		setNewMedia(null);
		setMediaPreview("");

		// Clear the file input
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	useEffect(() => {
		return () => {
			if (mediaPreview) {
				URL.revokeObjectURL(mediaPreview);
			}
		};
	}, [mediaPreview]);

	return {
		fileInputRef,
		mediaPreview,
		setMediaPreview,
		newMedia,
		setNewMedia,
		handleMediaChange,
		discardMediaChange,
	};
};

export { useMedia };
