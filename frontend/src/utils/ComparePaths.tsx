export const comparePaths = (link: string, curPage: string, channelAdmin: string | null = null) => {
	console.log("link:", link);

	if (link == curPage) {
		return true;
	} else {
		const curUser: string = "@" + localStorage.getItem("userName");
		const path = "/" + link.split("/").pop();

		console.log("curUser:", curUser);
		console.log("channelAdmin:", channelAdmin);
		console.log("link:", link);
		console.log("curPage:", curPage);

		if (channelAdmin === curUser) {
			if (path === "/videos" && ["/videos", "/playlists", "/tweets", "/subscribed"].includes(curPage)) {
				return true;
			} else if (path === curPage && curPage === "/dashboard") {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
};
