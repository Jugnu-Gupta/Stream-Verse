import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentType } from "../../type/Comment.type";

export interface TreeNode {
	val: CommentType;
	children: TreeNode[];
}
interface AddCommentPayloadType {
	childPathIds: string[];
	childs: CommentType[];
}
interface UpdateCommentPayloadType {
	childPathIds: string[];
	content: string;
}

interface DeleteCommentPayloadType {
	childPathIds: string[];
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
		addComments: (
			state: TreeNode,
			action: PayloadAction<AddCommentPayloadType>
		) => {
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
		},
		updateComment: (
			state: TreeNode,
			action: PayloadAction<UpdateCommentPayloadType>
		) => {
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
		},
		clearComments: (state: TreeNode) => {
			state.children.forEach((child) => {
				clearAllData(child);
			});
			state.children = [];
		},
		deleteComment: (
			state: TreeNode,
			action: PayloadAction<DeleteCommentPayloadType>
		) => {
			const { childPathIds } = action.payload;
			let prev = state;
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
				prev = root;
				root = nextNode;
			}
			if (!isNodeFound) {
				console.log("Node not found");
			} else {
				prev.children = prev.children.filter(
					(child) => child.val._id !== root.val._id
				);
				clearAllData(root);
			}
		},
	},
});

export const { addComments, updateComment, deleteComment, clearComments } =
	CommentSlice.actions;
export default CommentSlice.reducer;
