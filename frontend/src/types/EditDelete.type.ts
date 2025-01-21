import { Dispatch, SetStateAction } from "react";

interface EditDeleteType {
	currentId: string;
	pathToCurId?: string[];
	showEditModal: boolean;
	showDeleteModal: boolean;
	showEditDeletePopup: boolean;
}

interface EditDeleteWrapper {
	editDeleteOption: EditDeleteType;
	setEditDeleteOption: Dispatch<SetStateAction<EditDeleteType>>;
}

export type { EditDeleteType, EditDeleteWrapper };
