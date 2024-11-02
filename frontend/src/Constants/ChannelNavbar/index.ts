interface ChannelNavItemsProps {
	id: number;
	name: string;
	link: string;
}

const CHANNELNavItems: ChannelNavItemsProps[] = [
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

export default CHANNELNavItems;
export type { ChannelNavItemsProps };
