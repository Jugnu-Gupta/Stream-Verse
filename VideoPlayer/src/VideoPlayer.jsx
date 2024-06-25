// components/VideoPlayer.js

import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { generateThumbnailUrls } from "./thumbnail";

const VideoPlayer = () => {
	const videoRef = useRef(null);
	const [thumbnails, setThumbnails] = useState([]);
	const cloudName = "diypl8rwq"; // Replace with your actual cloud name
	const publicId = "ligcmzjuf67crz6xzoyj";

	useEffect(() => {
		const player = videojs(videoRef.current, {
			controls: true,
			autoplay: false,
			preload: "auto",
			sources: [
				{
					src: `https://res.cloudinary.com/${cloudName}/video/upload/q_auto/${publicId}.mp4`,
					type: "video/mp4",
				},
			],
		});

		// Generate thumbnail URLs
		const thumbnailUrls = generateThumbnailUrls(cloudName, publicId);
		setThumbnails(thumbnailUrls);

		// Event listener for thumbnail preview on hover
		player.ready(() => {
			const progressControl = player.controlBar.progressControl;
			const seekBar = progressControl.seekBar;

			seekBar.on("mousemove", (event) => {
				const duration = player.duration();
				const hoverTime = (event.offsetX / seekBar.width()) * duration;
				const thumbnail = thumbnails.find(
					(thumb) =>
						hoverTime >= thumb.time && hoverTime < thumb.time + 10
				);

				if (thumbnail) {
					showThumbnail(thumbnail.url);
				}
			});

			seekBar.on("mouseout", () => {
				hideThumbnail(); // Implement this function to hide the thumbnail preview
			});
		});

		return () => {
			if (player) {
				player.dispose();
			}
		};
	}, [cloudName, publicId, thumbnails]);

	const showThumbnail = (url) => {
		// Implement logic to display the thumbnail preview
	};

	const hideThumbnail = () => {
		// Implement logic to hide the thumbnail preview
	};

	return (
		<div className="video-player-container">
			<video
				ref={videoRef}
				className="video-js vjs-default-skin"
				width="100%"
				height="auto"
			/>
		</div>
	);
};

export default VideoPlayer;
