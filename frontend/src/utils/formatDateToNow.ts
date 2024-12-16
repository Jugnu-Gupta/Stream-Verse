import { formatDistanceToNow } from "date-fns";

export const formatDateToNow = (date: Date) => {
	return formatDistanceToNow(new Date(date), { addSuffix: true });
};
