import { createSlice } from "@reduxjs/toolkit";
import { CommentType } from "../../Types/Comment.type";

export interface TreeNode {
	val: CommentType;
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
		likeStatus: 0,
		likes: 0,
		dislikes: 0,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	children: [],
};

const clearAllData = (node: TreeNode) => {
	node.children.forEach((child) => {
		clearAllData(child);
	});
	node.val = {
		owner: {
			_id: "",
			userName: "",
			fullName: "",
		},
		replies: 0,
		likeStatus: 0,
		likes: 0,
		dislikes: 0,
		content: "",
		_id: "",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
	node.children = [];
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
				root = nextNode;
			}
			if (!isNodeFound) {
				console.log("Node not found");
			} else {
				childs.forEach((child: CommentType) => {
					root.children.push({ val: child, children: [] });
				});
			}
			// console.log("state:", JSON.stringify(state, null, 2));
		},
		updateComment: (state, action) => {
			const { childPathIds, content } = action.payload;
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
				root = nextNode;
			}
			if (!isNodeFound) {
				console.log("Node not found");
			} else {
				root.val.content = content;
			}
			// console.log("state:", JSON.stringify(state, null, 2));
		},
		clearComments: (state) => {
			state.children.forEach((child) => {
				clearAllData(child);
			});
		},
		deleteComment: (state, action) => {
			const { childPathIds } = action.payload;
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
				root = nextNode;
			}
			if (!isNodeFound) {
				console.log("Node not found");
			} else {
				clearAllData(root);
			}
		},
	},
});

export const { addComments, updateComment, deleteComment, clearComments } =
	CommentSlice.actions;
export default CommentSlice.reducer;
