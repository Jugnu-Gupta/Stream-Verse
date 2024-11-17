// import React, { useEffect } from "react";
// import thumbnail from "../../assets/thumbnail.png";
// import { twMerge } from "tailwind-merge";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { MdOutlineEdit } from "react-icons/md";

// const VideoListView: React.FC = () => {
// 	const divRef = React.useRef<HTMLDivElement>(null);
// 	const [status, setStatus] = React.useState<boolean>(false);

// 	useEffect(() => {
// 		if (divRef.current) {
// 			const divChild = divRef.current.children[0] as HTMLDivElement;

// 			if (status) {
// 				divChild.classList.add("translate-x-4");
// 				divChild.classList.remove("translate-x-0");
// 			} else {
// 				divChild.classList.add("translate-x-0");
// 				divChild.classList.remove("translate-x-4");
// 			}
// 		}
// 	}, [status]);

// 	return (
// 		<div className="flex justify-between items-center w-full text-white gap-2 border-b-2 border-background-secondary px-2 py-2">
// 			<div
// 				ref={divRef}
// 				onClick={() => setStatus(!status)}
// 				className={twMerge(
// 					"relative rounded-full h-[19px] w-9 px-1",
// 					status ? "bg-primary" : "bg-white"
// 				)}>
// 				<div className="w-3 aspect-square rounded-full bg-background-primary absolute top-[3px] left-1 duration-300"></div>
// 			</div>
// 			<div className="w-24 flex justify-center text-sm">
// 				{status ? (
// 					<p className="text-[#15803D] rounded-full border-2 border-[#15803D] w-fit px-2">
// 						Published
// 					</p>
// 				) : (
// 					<p className="text-[#B91C1C] rounded-full border-2 border-[#B91C1C] w-fit px-2">
// 						Unpublished
// 					</p>
// 				)}
// 			</div>
// 			<div className="flex items-center w-1/3 gap-2 justify-start">
// 				<img
// 					src={thumbnail}
// 					alt="thumbnail"
// 					className="w-8 aspect-square rounded-full"
// 				/>
// 				<p className="font-semibold text-sm">Video Title</p>
// 				{/* <p>Video Title</p> */}
// 			</div>
// 			<div className="flex items-center gap-2 w-[150px] text-nowrap text-sm">
// 				<p className="bg-[#BBF7D0] text-[#15803D] rounded-xl h-fit px-2">
// 					5 likes
// 				</p>
// 				<p className="bg-[#FECACA] text-[#B91C1C] rounded-xl h-fit px-2">
// 					4 dislikes
// 				</p>
// 			</div>
// 			<div className="w-24 text-nowrap text-sm">
// 				<p>2021-08-01</p>
// 			</div>
// 			<div className="flex items-center gap-1 w-10">
// 				<button><RiDeleteBin6Line /></button>
// 				<button><MdOutlineEdit /></button>
// 			</div>
// 		</div>
// 	);
// };

// export default VideoListView;


import React, { useEffect } from "react";
import thumbnail from "../../assets/thumbnail.png";
import { twMerge } from "tailwind-merge";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import EditVideoModal from "../../components/Popup/EditVideoModal";
import DeleteVideoModal from "../../components/Popup/DeleteVideoModal";


const VideoListView: React.FC = () => {
	const [showEditVideo, setShowEditVideo] = React.useState(false);
	const [showDeleteVideo, setShowDeleteVideo] = React.useState(false);
	const divRef = React.useRef<HTMLDivElement>(null);
	const [status, setStatus] = React.useState<boolean>(false);

	useEffect(() => {
		if (divRef.current) {
			const divChild = divRef.current.children[0] as HTMLDivElement;

			if (status) {
				divChild.classList.add("translate-x-4");
				divChild.classList.remove("translate-x-0");
			} else {
				divChild.classList.add("translate-x-0");
				divChild.classList.remove("translate-x-4");
			}
		}
	}, [status]);

	return (
		<tr className="text-white border-b-2 border-background-secondary border-x">
			<td className="px-4 py-2 justify-items-center">
				<div
					ref={divRef}
					onClick={() => setStatus(!status)}
					className={twMerge(
						"relative rounded-full h-[19px] w-9 px-1 cursor-pointer",
						status ? "bg-primary" : "bg-white"
					)}>
					<div className="w-3 aspect-square rounded-full bg-background-primary absolute top-[3px] left-1 duration-300"></div>
				</div>
			</td>
			<td className="px-4 py-2 justify-items-center">
				{status ? (
					// <p className="text-[#15803D] rounded-full border-2 border-[#15803D] w-fit px-2">
					<p className="bg-[#15803D] rounded-full w-fit px-2">
						Published
					</p>
				) : (
					// <p className="text-[#B91C1C] rounded-full border-2 border-[#B91C1C] w-fit px-2">
					<p className="bg-[#B91C1C] rounded-full w-fit px-2">
						Unpublished
					</p>
				)}
			</td>
			{/* <td className="flex items-center gap-2 px-4 py-2 justify-items-center"> */}
			<td className="px-4 py-2 justify-items-start flex items-center gap-2 overflow-hidden">
				<img
					src={thumbnail}
					alt="thumbnail"
					className="w-8 aspect-square rounded-full"
				/>
				<p className="font-semibold text-sm text-nowrap truncate w-full">Video Title scsascs</p>
			</td>
			<td className="text-center px-4 py-2 text-nowrap">
				<p className="bg-[#BBF7D0] text-[#15803D] rounded-xl px-2 inline-block mr-2">
					5 likes
				</p>
				<p className="bg-[#FECACA] text-[#B91C1C] rounded-xl px-2 inline-block">
					4 dislikes
				</p>
			</td>
			<td className="text-center px-4 py-2 text-nowrap">2021-08-01</td>

			<td className="text-center px-4 py-2 text-nowrap">
				<div className="text-start">
					{showEditVideo && <EditVideoModal setShowEditVideo={setShowEditVideo} />}
					{showDeleteVideo && <DeleteVideoModal setShowDeleteVideo={setShowDeleteVideo} />}
				</div>

				<button className="pr-2" onClick={() => setShowDeleteVideo(true)}><RiDeleteBin6Line /></button>
				<button onClick={() => setShowEditVideo(true)}><MdOutlineEdit /></button>
			</td>
		</tr >
	);
};

export default VideoListView;
