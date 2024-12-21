export const comparePaths = (
	link: string,
	curPage: string,
	channelAdmin: string | null = null
) => {
	if (link == curPage) {
		return true;
	} else {
		const curUser: string = "@" + localStorage.getItem("userName");
		const path = "/" + link.split("/").pop();

		if (channelAdmin === curUser) {
			if (
				path === "/videos" &&
				["/videos", "/playlists", "/tweets", "/subscribed"].some(
					(path) => curPage.endsWith(path)
				)
			) {
				return true;
			} else if (path === "/dashboard" && curPage.endsWith(path)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
};
