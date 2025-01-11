import { formatDistanceToNow } from "date-fns";

const formatDateDistanceToNow = (date: Date | undefined): string => {
	if (!date) return formatDateDistanceToNow(new Date());
	return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export { formatDateDistanceToNow };
