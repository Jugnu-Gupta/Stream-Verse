import React, { useEffect } from "react";
import thumbnail from "../../assets/thumbnail.png";
import { twMerge } from "tailwind-merge";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import EditVideoModal from "../../components/Popup/EditVideoModal";
import DeleteModal from "../../components/Popup/DeleteModal";
import { format } from "date-fns";
import { formatNumber } from "../../utils/FormatNumber";
import { DashboardVideoType } from "../../Types/Dashboard.type";
import makeApiRequest from "../../utils/MakeApiRequest";

interface DashboardVideoStatsControlProps {
	videoInfo: DashboardVideoType;
}
const DashboardVideoStatsControl: React.FC<DashboardVideoStatsControlProps> = ({ videoInfo }) => {
	const [showEditVideo, setShowEditVideo] = React.useState<boolean>(false);
	const [showDeleteVideo, setShowDeleteVideo] = React.useState<boolean>(false);
	const divRef = React.useRef<HTMLDivElement>(null);
	const [status, setStatus] = React.useState<boolean>(videoInfo?.isPublished);
	const likes = formatNumber(videoInfo?.likes);
	const dislikes = formatNumber(videoInfo?.dislikes);
	const title = videoInfo?.title;
	const uploadedAt = format(videoInfo.createdAt, "yyyy-MM-dd");

	const updatePushishStatus = () => {
		makeApiRequest({
			method: "patch",
			url: `/api/v1/videos/${videoInfo._id}/publish`,
			data: { isPublished: !status }
		}).then((response: any) => { // eslint-disable-line
			console.log("response:", response);
			setStatus(!status);
		}).catch((error) => {
			console.error("Error updating video status:", error);
		});
	}

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
		<tr className="text-white border-primary-border border-2">
			<td className="px-4 py-2 justify-items-center">
				<div ref={divRef}
					onClick={updatePushishStatus}
					className={twMerge(
						"relative rounded-full h-[19px] w-9 px-1 cursor-pointer",
						status ? "bg-primary" : "bg-primary-text"
					)}>
					<div className="w-3 aspect-square rounded-full bg-background-primary absolute top-[3px] left-1 duration-300"></div>
				</div>
			</td>
			<td className="px-4 py-2 justify-items-center text-primary-text font-semibold">
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
				<img src={thumbnail} alt="thumbnail" loading='lazy'
					className="w-8 aspect-square rounded-full"
				/>
				<p className="font-semibold text-sm text-nowrap truncate w-full text-primary-text">{title}</p>
			</td>
			<td className="text-center px-4 py-2 text-nowrap">
				<p className="bg-[#BBF7D0] text-[#15803D] rounded-xl px-2 inline-block mr-2">
					{likes} likes
				</p>
				<p className="bg-[#FECACA] text-[#B91C1C] rounded-xl px-2 inline-block">
					{dislikes} dislikes
				</p>
			</td>
			<td className="text-center px-4 py-2 text-nowrap text-primary-text">{uploadedAt}</td>

			<td className="text-center px-4 py-2 text-nowrap text-primary-icon">
				<div className="text-start">
					{showEditVideo && <EditVideoModal videoInfo={videoInfo} setShowEditVideo={setShowEditVideo} />}
					{showDeleteVideo && <DeleteModal Name="Video" Url={`/api/v1/videos/${videoInfo._id}`} setShowDeleteModal={setShowDeleteVideo} />}
				</div>

				<button className="pr-2" onClick={() => setShowDeleteVideo(true)}><RiDeleteBin6Line /></button>
				<button onClick={() => setShowEditVideo(true)}><MdOutlineEdit /></button>
			</td>
		</tr >
	);
};

export default DashboardVideoStatsControl;
