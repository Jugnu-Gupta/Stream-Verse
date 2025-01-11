import { formatDistanceToNow } from "date-fns";

export const formatDateToNow = (date: Date | undefined): string => {
	if (!date) return formatDateToNow(new Date());
	return formatDistanceToNow(new Date(date), { addSuffix: true });
};
