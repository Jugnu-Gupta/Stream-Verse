import toast from "react-hot-toast";

export const validateImageSize = (
	e: React.ChangeEvent<HTMLInputElement>,
	fileSize: number
) => {
	if (e.target.files![0].size > fileSize) {
		// fileSize is in Bytes
		console.error("Image size should not exceed 1 MB");
		toast.error("File size should not exceed 1 MB");
		e.target.value = "";
	}
};
