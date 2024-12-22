import React from "react";
import CommentCard from "../../components/Comment/CommentCard";
import ChannelTweetList from "../Channel/Tweets/ChannelTweetList";
import makeApiRequest from "../../utils/MakeApiRequest";
import { useNavigate, useParams } from "react-router-dom";
import { addComments } from "../../context/slices/CommentSlice";
import { useDispatch } from "react-redux";
import { CommentType } from "../../Types/Comment.type";
import AddComment from "../../components/Comment/AddComment";
import { formatNumber } from "../../utils/FormatNumber";
import { TweetType } from "../../Types/Tweet.type";

const TweetDetails: React.FC = () => {
	const [comments, setComments] = React.useState<CommentType[]>([]);
	const [tweet, setTweet] = React.useState<TweetType>();
	const noOfcomments = formatNumber(tweet?.comments);
	const currPath = React.useMemo<string[]>(() => [], []);
	const { tweetId } = useParams<string>();
	const userId = localStorage.getItem("userId");
	const tweetNo = tweet?._id || "";
	const navigate = useNavigate();
	const dispatch = useDispatch();

	React.useEffect(() => {
		makeApiRequest({
			method: "get",
			url: `/api/v1/tweets/${"67509b2d90f1874c266f0643"}${userId ? `/${userId}` : ""}`, //tweetId
		}).then((tweetRes: any) => { // eslint-disable-line
			// console.log("tweet:", tweetRes.data?.tweets?.[0]);
			setTweet(tweetRes.data?.tweets?.[0]);

			// find details of current video
			return makeApiRequest({
				method: "get",
				url: `/api/v1/comments/tweet/${"67509b2d90f1874c266f0643"}${userId ? `?userId=${userId}` : ""}`,
			});
		}).then((commentsRes: any) => { // eslint-disable-line
			// console.log("comments:", commentsRes.data?.comments);
			const commentsData = commentsRes.data?.comments || [];
			setComments(commentsData);

			dispatch(addComments({ childPathIds: currPath, childs: commentsData }));
		}).catch((error) => {
			console.error("Error fetching data:", error);
			// navigate("/");
		})
	}, [tweetId, userId, navigate, dispatch, currPath]);

	return (
		<div className="px-4 pt-4 w-full flex justify-items-center flex-col overflow-hidden">
			<ChannelTweetList tweetInfo={tweet} />
			<div className="flex flex-col items-start gap-2 px-6 xs:px-2 w-full mt-4 max-w-5xl">
				<div className="text-primary-text font-bold text-xl">
					<h1>{noOfcomments} Comments</h1>
				</div>
				<AddComment avatarStyle="w-11" />

				{comments?.map((comment: CommentType) => (
					<CommentCard
						key={comment?._id}
						currPath={currPath.concat(comment?._id)}
						comment={comment}
						entityId={tweetNo}
						entityType="tweet"
					/>
				))}
			</div>
		</div>
	);
};

export default TweetDetails;
