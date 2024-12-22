import React from "react";

interface ShowHideTextProps {
	content: string;
}
const ShowHideText: React.FC<ShowHideTextProps> = ({ content }) => {
	const [readMore, setReadMore] = React.useState(false);

	const text = content;
	return (<div className="text-primary-text">
		<p className="text-sm">
			{readMore
				? text
				: (text.length < 100 ? text : text.slice(0, 100) + "...")}
		</p>
		{
			text.length < 100 ? null : (
				<button
					onClick={() => setReadMore(!readMore)}
					className="text-primary text-sm">
					{readMore ? "Read Less" : "Read More"}
				</button>
			)
		}
	</div>)
};

export default ShowHideText;
