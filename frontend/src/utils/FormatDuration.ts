export const formatDuration = (seconds: number | undefined) => {
	if (!seconds) return 0;

	const secs = (seconds % 60).toFixed(0);
	const mins = Math.floor(seconds / 60) % 60;
	const hours = Math.floor(seconds / 3600);

	if (hours > 0) {
		return `${hours}:${mins.toString().padStart(2, "0")}:${secs
			.toString()
			.padStart(2, "0")}`;
	} else if (mins > 0) {
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	} else {
		return `${secs.toString().padStart(2, "0")}`;
	}
};
