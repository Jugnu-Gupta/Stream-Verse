export const comparePaths = (link: string, curPage: string) => {
	if (link == curPage) {
		return true;
	} else {
		// console.log("link:", link);
		// console.log("curPage:", curPage);
		const path = "/" + link.split("/").pop();
		// console.log("path:", path);
		if (
			path === "/videos" &&
			["/videos", "/playlists", "/tweets", "/subscribed"].includes(
				curPage
			)
		) {
			return true;
		} else if (path === curPage) {
			return true;
		} else {
			return false;
		}
	}
};
