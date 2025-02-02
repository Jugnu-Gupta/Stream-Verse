import { formatNumber } from "./FormatNumber";

export const computeSubscriberCount = (
	subscribers: number | undefined,
	subscriberStatus: boolean | undefined,
	isSubscriber: boolean
) => {
	let subscriberCount = parseInt(subscribers?.toString() || "0");

	if (isSubscriber && !subscriberStatus) {
		subscriberCount += 1;
	} else if (!isSubscriber && subscriberStatus) {
		subscriberCount -= 1;
	}
	return formatNumber(subscriberCount);
};
