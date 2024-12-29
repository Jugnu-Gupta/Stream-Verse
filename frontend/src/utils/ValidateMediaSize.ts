import toast from "react-hot-toast";

const validateMediaSize = (
	files: FileList, // e.g. e.target.files
	maxSize: number
) => {
	// fileSize is in MB
	if (files![0].size <= maxSize * 1024 * 1024) {
		return true;
	} else {
		console.error(`File size should not exceed ${maxSize}MB`);
		toast.error(`File size should not exceed ${maxSize}MB`);
		return false;
	}
};

export default validateMediaSize;
