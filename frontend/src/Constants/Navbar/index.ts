import { FunctionComponent, SVGProps } from "react";
import Icons from "../../assets/Navbar/Index";

interface NavItem {
	id: number;
	path: string;
	title: string;
	isTop: boolean;
	titleClass?: string;
	iconFilled: FunctionComponent<SVGProps<SVGSVGElement>>;
	iconFilledClass: string;
	iconOutline: FunctionComponent<SVGProps<SVGSVGElement>>;
	iconOutlineClass: string;
}

const NAVITEMS: NavItem[] = [
	{
		id: 1,
		path: "/",
		title: "Home",
		isTop: true,
		titleClass: "ml-[-1px]",
		iconFilled: Icons.MdHomeFilled,
		iconFilledClass: "text-xl",
		iconOutline: Icons.GrHomeRounded,
		iconOutlineClass: "text-base",
	},
	{
		id: 2,
		path: "/subscriptions",
		title: "Subscriptions",
		isTop: true,
		iconFilled: Icons.MdSubscriptions,
		iconFilledClass: "text-lg",
		iconOutline: Icons.MdOutlineSubscriptions,
		iconOutlineClass: "text-lg",
	},
	{
		id: 3,
		path: "/user/videos",
		title: "Your Channel",
		isTop: true,
		iconFilled: Icons.BiSolidUserRectangle,
		iconFilledClass: "text-lg",
		iconOutline: Icons.TbUserSquare,
		iconOutlineClass: "text-lg",
	},
	{
		id: 4,
		path: "/collections",
		title: "Collections",
		isTop: true,
		iconFilled: Icons.PiFolderBold,
		iconFilledClass: "text-lg",
		iconOutline: Icons.PiFolder,
		iconOutlineClass: "text-lg",
	},
	{
		id: 5,
		path: "/history",
		title: "History",
		isTop: true,
		iconFilled: Icons.FaHistory,
		iconFilledClass: "text-lg",
		iconOutline: Icons.VscHistory,
		iconOutlineClass: "text-lg",
	},
	{
		id: 6,
		path: "/liked-videos",
		title: "Liked videos",
		isTop: true,
		iconFilled: Icons.BiSolidLike,
		iconFilledClass: "text-lg",
		iconOutline: Icons.BiLike,
		iconOutlineClass: "text-lg",
	},
	{
		id: 7,
		path: "/help",
		title: "Help",
		isTop: false,
		iconFilled: Icons.IoMdHelpCircleOutline,
		iconFilledClass: "text-xl",
		iconOutline: Icons.IoMdHelpCircleOutline,
		iconOutlineClass: "text-xl",
	},
	// {
	// 	id: 8,
	// 	path: "/feedback",
	// 	title: "Feedback",
	// 	isTop: false,
	// 	iconFilled: Icons.MdOutlineFeedback,
	// 	iconFilledClass: "text-lg",
	// 	iconOutline: Icons.MdOutlineFeedback,
	// 	iconOutlineClass: "text-lg",
	// },
	{
		id: 9,
		path: "/:adminName/dashboard",
		title: "Settings",
		isTop: false,
		iconFilled: Icons.CiSettings,
		iconFilledClass: "text-xl",
		iconOutline: Icons.CiSettings,
		iconOutlineClass: "text-xl",
	},
];

export type { NavItem };
export default NAVITEMS;
