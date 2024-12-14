export const addAdminName = (url: string) => {
	const adminName: string | null = localStorage.getItem("userName");
	if (adminName) {
		if (url.includes(":adminName")) {
			url = url.replace(":adminName", "@" + adminName);
		}
	}
	// else {
	// 	url = "/login";
	// }

	return url;
};
