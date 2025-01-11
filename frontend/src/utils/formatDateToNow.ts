import { formatDistanceToNow } from "date-fns";

const formatDateToNow = (date: Date | undefined): string => {
	if (!date) return formatDateToNow(new Date());
	return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export { formatDateToNow };
