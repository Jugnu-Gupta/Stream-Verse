import { createSlice } from "@reduxjs/toolkit";
import { CommentType } from "../../Types/Comment";

export interface TreeNode {
	val: CommentType | null;
	children: TreeNode[];
}

const initialState: TreeNode = {
	val: {
		owner: {
			_id: "root",
			userName: "root",
			fullName: "root",
		},
		content: "root",
		_id: "root",
		replies: 0,
		likes: 0,
		dislikes: 0,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	children: [],
};

const CommentSlice = createSlice({
	name: "comment",
	initialState,
	reducers: {
		addComments: (state, action) => {
			const { childPathIds, childs } = action.payload;
			let root = state;
			let isNodeFound: boolean = true;

			for (let i = 0; i < childPathIds.length; i++) {
				const nextNode = root.children.find(
					(child) => child.val?._id === childPathIds[i]
				);
				if (!nextNode) {
					isNodeFound = false;
					break;
				}
				// go to the next child
				root = nextNode;
			}
			if (!isNodeFound) {
				console.log("Node not found");
			} else {
				childs.forEach((child: CommentType) => {
					root.children.push({ val: child, children: [] });
				});
			}
		},
		clearComments: (state) => {
			const clearAllData = (node: TreeNode) => {
				node.children.forEach((child) => {
					clearAllData(child);
				});
				node.val = null;
				node.children = [];
			};
			state.children.forEach((child) => {
				clearAllData(child);
			});
		},
	},
});

export const { addComments, clearComments } = CommentSlice.actions;
export default CommentSlice.reducer;
