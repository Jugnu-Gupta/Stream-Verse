import { Dispatch, SetStateAction } from "react";

export interface EditDeleteType {
	currentId: string;
	showEditModal: boolean;
	showDeleteModal: boolean;
	showEditDeletePopup: boolean;
}

export interface EditDeleteWrapper {
	editDeleteOption: EditDeleteType;
	setEditDeleteOption: Dispatch<SetStateAction<EditDeleteType>>;
}
