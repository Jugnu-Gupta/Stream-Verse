export const formatNumber = (num: number) => {
	// Format numbers to K, M, B, and return 3 MSD etc.
	if (num >= 1000000000) {
		const result = num / 1000000000;
		return result.toFixed(result >= 10 ? 1 : 2) + "B";
	} else if (num >= 1000000) {
		const result = num / 1000000;
		return result.toFixed(result >= 10 ? 1 : 2) + "M";
	} else if (num >= 1000) {
		const result = num / 1000;
		return result.toFixed(result >= 10 ? 1 : 2) + "K";
	} else {
		return num.toString();
	}
};
