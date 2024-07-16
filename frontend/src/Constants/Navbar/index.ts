import { FunctionComponent, SVGProps } from "react";
import Icons from "../../assets/Navbar/Index";

interface NavItem {
	id: number;
	title: string;
	isTop: boolean;
	titleClass?: string;
	iconFilled: FunctionComponent<SVGProps<SVGSVGElement>>;
	iconFilledClass: string;
	iconFilledMargin: string;
	iconOutline: FunctionComponent<SVGProps<SVGSVGElement>>;
	iconOutlineClass: string;
	iconOutlineMargin: string;
}

const NAVITEMS: NavItem[] = [
	{
		id: 1,
		title: "Home",
		isTop: true,
		titleClass: "ml-[-1px]",
		iconFilled: Icons.MdHomeFilled,
		iconFilledClass: "text-xl",
		iconFilledMargin: "ml-[6px]",
		iconOutline: Icons.GrHomeRounded,
		iconOutlineClass: "text-base",
		iconOutlineMargin: "ml-2",
	},
	{
		id: 2,
		title: "Subscriptions",
		isTop: true,
		iconFilled: Icons.MdSubscriptions,
		iconFilledClass: "text-lg",
		iconFilledMargin: "ml-[7px]",
		iconOutline: Icons.MdOutlineSubscriptions,
		iconOutlineClass: "text-lg",
		iconOutlineMargin: "ml-[7px]",
	},
	{
		id: 3,
		title: "Your Channel",
		isTop: true,
		iconFilled: Icons.BiSolidUserRectangle,
		iconFilledClass: "text-lg",
		iconFilledMargin: "ml-[7px]",
		iconOutline: Icons.TbUserSquare,
		iconOutlineClass: "text-lg",
		iconOutlineMargin: "ml-[7px]",
	},
	{
		id: 4,
		title: "History",
		isTop: true,
		iconFilled: Icons.FaHistory,
		iconFilledClass: "text-lg",
		iconFilledMargin: "ml-[7px]",
		iconOutline: Icons.VscHistory,
		iconOutlineClass: "text-lg",
		iconOutlineMargin: "ml-[7px]",
	},
	{
		id: 5,
		title: "Liked videos",
		isTop: true,
		iconFilled: Icons.BiSolidLike,
		iconFilledClass: "text-lg",
		iconFilledMargin: "ml-[7px]",
		iconOutline: Icons.BiLike,
		iconOutlineClass: "text-lg",
		iconOutlineMargin: "ml-[7px]",
	},
	{
		id: 6,
		title: "Help",
		isTop: false,
		iconFilled: Icons.IoMdHelpCircleOutline,
		iconFilledClass: "text-xl",
		iconFilledMargin: "ml-[6px]",
		iconOutline: Icons.IoMdHelpCircleOutline,
		iconOutlineClass: "text-xl",
		iconOutlineMargin: "ml-[6px]",
	},
	{
		id: 7,
		title: "Feedback",
		isTop: false,
		iconFilled: Icons.MdOutlineFeedback,
		iconFilledClass: "text-lg",
		iconFilledMargin: "ml-[7px]",
		iconOutline: Icons.MdOutlineFeedback,
		iconOutlineClass: "text-lg",
		iconOutlineMargin: "ml-[7px]",
	},
	{
		id: 8,
		title: "Settings",
		isTop: false,
		iconFilled: Icons.CiSettings,
		iconFilledClass: "text-xl",
		iconFilledMargin: "ml-[6px]",
		iconOutline: Icons.CiSettings,
		iconOutlineClass: "text-xl",
		iconOutlineMargin: "ml-[6px]",
	},
];

export type { NavItem };
export default NAVITEMS;
