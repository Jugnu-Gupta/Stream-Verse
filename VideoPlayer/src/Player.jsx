import React, { useRef, useState, useEffect } from "react";
import { Video, Transformation } from "cloudinary-react";

const VideoPlayer = () => {
	const cloudName = "diypl8rwq"; // Replace with your actual cloud name
	const videoPublicId = "ligcmzjuf67crz6xzoyj"; // Replace with your actual public ID
	// const videoPublicId = "sbid4lbttymg0svju3re"; // Replace with your actual public ID
	const videoRef = useRef(null);
	const [quality, setQuality] = useState("auto:eco"); // default quality
	const [posterUrl, setPosterUrl] = useState("");
	const videoUrl = `https://res.cloudinary.com/diypl8rwq/video/upload/q_auto:${quality}/ligcmzjuf67crz6xzoyj.mp4`; // Example video URL
	const [currentTime, setCurrentTime] = useState(0);

	useEffect(() => {
		console.log("currentTime: ", currentTime);
		videoRef.current.element.current.currentTime = currentTime;
	}, [videoRef?.current?.element?.current?.currentTime]);

	// useEffect(() => {
	// 	console.log("duration: ", 60);
	// 	videoRef.current.element.current.currentTime = 300;
	// 	videoRef.current.element.current.currentTime = currentTime;
	// }, [videoRef?.current?.element?.current?.duration]);

	useEffect(() => {
		const generatePosterUrl = (videoUrl, cloudName, startOffset = 0) => {
			const videoPublicId = videoUrl.split("/").pop().split(".")[0]; // Extract the public ID from the video URL
			return `https://res.cloudinary.com/${cloudName}/video/upload/so_${startOffset}/v1/${videoPublicId}.jpg`;
		};

		const posterUrl = generatePosterUrl(videoUrl, cloudName);
		setPosterUrl(posterUrl);

		console.log("videoRef");
		console.log(videoRef);
		console.log(videoRef?.current);
		console.log(videoRef?.current?.element);
		console.log(videoRef?.current?.element?.current);
		console.log(videoRef?.current?.element?.current?.currentTime);
	}, []);

	const changeQuality = (newQuality) => {
		setCurrentTime(videoRef?.current?.element?.current?.currentTime);
		// currentTime = videoRef?.current?.element?.current?.currentTime;
		// console.log(
		// 	"videoRef: ",
		// 	videoRef?.current?.element?.current?.currentTime
		// );
		// console.log("currentTime: ", currentTime);
		setQuality(newQuality);
	};

	return (
		<div className="video-player">
			<Video
				// duration={30}
				cloudName={cloudName}
				publicId={videoPublicId}
				ref={videoRef}
				width="100%"
				height="auto"
				controls
				autoPlay
				poster={posterUrl}>
				<Transformation
					aspectRatio="16:9"
					quality={
						quality === "auto:eco"
							? "auto:eco"
							: `auto:eco,${quality}`
					}
				/>
			</Video>
			<div className="controls">
				<div>
					<label>Quality:</label>
					<select
						value={quality}
						onChange={(e) => changeQuality(e.target.value)}>
						<option value="auto:eco">auto</option>
						<option value="c_fill,h_720,w_1280">720p</option>
						<option value="c_fill,h_480,w_854">480p</option>
						<option value="c_fill,h_360,w_640">360p</option>
						<option value="c_fill,h_240,w_426">240p</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default VideoPlayer;
