import { validateImageSize } from "./ValidateImageSize";

export const updateImage = (
	e: React.ChangeEvent<HTMLInputElement>,
	setImage: React.Dispatch<React.SetStateAction<string>>,
	fileSize: number
) => {
	validateImageSize(e, fileSize);
	setImage(URL.createObjectURL(e.target.files![0]));
};
