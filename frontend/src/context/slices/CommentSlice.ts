import { createSlice } from "@reduxjs/toolkit";

export interface value {
	owner: string;
	content: string;
	id: number;
	replies: number;
	likes: number;
	dislikes: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface TreeNode {
	val: value;
	children: TreeNode[];
}

const initialState: TreeNode = {
	val: {
		owner: "root",
		content: "root",
		id: 0,
		replies: 0,
		likes: 0,
		dislikes: 0,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	children: [],
};

const CommentSlice = createSlice({
	name: "comment",
	initialState,
	reducers: {
		AddComments: (state, action) => {
			const { parentPath, childs } = action.payload;

			let root = state;
			for (let i = 0; i < parentPath.length; i++) {
				// if the parent is not found
				if (root.children.length <= parentPath[i]) break;

				// go to the next parent
				root = root.children[parentPath[i]];

				// add the childs to the last parent
				if (i + 1 === parentPath.length) {
					root.children.push(...childs);
				}
			}
		},
	},
});

export const { AddComments } = CommentSlice.actions;
export default CommentSlice.reducer;
