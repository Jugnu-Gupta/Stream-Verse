export const addAdminName = (url: string) => {
	const adminName: string | null = "@" + localStorage.getItem("userName");
	if (url.includes(":adminName") && adminName) {
		url = url.replace(":adminName", adminName);
	}

	return url;
};
