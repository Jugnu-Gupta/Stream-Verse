import { createSelector } from "reselect";
import { RootState } from "../../context/store";

const selectComments = (state: RootState) => state.comments;

// Memoized selector to traverse the tree and get replies
export const selectReplies = createSelector(
	[selectComments, (_, currPath: string[]) => currPath],
	(root, currPath) => {
		let node = root;

		for (let i = 0; i < currPath.length; i++) {
			const nextNode = node.children.find(
				(child) => child.val?._id === currPath[i]
			);
			if (!nextNode) return [];
			node = nextNode;
		}

		return node.children.map((child) => child.val).reverse();
	}
);
