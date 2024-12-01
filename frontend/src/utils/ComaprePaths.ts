export const comparePaths = (link: string, curPage: string) => {
	if (link == curPage) {
		return true;
	} else {
		const curUser: string = link.split("/")?.[0];
		const channelAdmin: string =
			"@" + localStorage.getItem("channelAdmin") || "";

		console.log("curUser:", curUser);
		console.log("channelAdmin:", channelAdmin);
		// console.log("link:", link);
		console.log("curPage:", curPage);
		const path = "/" + link.split("/").pop();
		console.log("path:", path);
		if (
			path === "/videos" &&
			curUser === channelAdmin &&
			["/videos", "/playlists", "/tweets", "/subscribed"].includes(
				curPage
			)
		) {
			return true;
		} else if (path === curPage && path === "/dashboard") {
			return true;
		} else {
			return false;
		}
	}
};
