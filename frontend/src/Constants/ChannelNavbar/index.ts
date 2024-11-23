interface ChannelNavItemsProps {
	id: number;
	name: string;
	link: string;
}

const CHANNELNAVITEMS: ChannelNavItemsProps[] = [
	{
		id: 1,
		name: "Videos",
		link: "videos",
	},
	{
		id: 2,
		name: "Playlists",
		link: "playlists",
	},
	{
		id: 3,
		name: "Tweets",
		link: "tweets",
	},
	{
		id: 4,
		name: "Subscribed",
		link: "subscribed",
	},
];

const CHANNELNAVITEMS2: ChannelNavItemsProps[] = [
	{
		id: 1,
		name: "Personal Information",
		link: "personal-information",
	},
	{
		id: 2,
		name: "Change Password",
		link: "change-password",
	},
];

export default CHANNELNAVITEMS;
export { CHANNELNAVITEMS2 };
export type { ChannelNavItemsProps };
