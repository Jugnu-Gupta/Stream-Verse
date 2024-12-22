import React from 'react';
import { twMerge } from 'tailwind-merge';
import thumbnail from '../../assets/thumbnail.png';


interface AddCommentProps {
    setGiveReply?: React.Dispatch<React.SetStateAction<boolean>>;
    avatarStyle: string;
}
const AddComment: React.FC<AddCommentProps> = ({ setGiveReply, avatarStyle }) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
    const [addCommentText, setAddCommentText] = React.useState<string>("");

    React.useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current!.style.height = "32px";
            const scrollHeight = textAreaRef.current!.scrollHeight;
            textAreaRef.current!.style.height = `${scrollHeight}px`;
        }
    }, [addCommentText]);

    return (
        <div className={twMerge("flex items-start w-full", "gap-2")}>
            <div className={twMerge("overflow-hidden rounded-full", avatarStyle)}>
                {/* // current user image */}
                <img
                    src={thumbnail}
                    alt="thumbnail"
                    className="rounded-full w-full aspect-square"
                />
            </div>
            <div className="text-primary-text flex flex-col w-full items-end">
                <textarea
                    className="w-full h-8 pb-1 border-b-2 border-primary-border mb-2 overflow-hidden outline-none resize-none bg-transparent"
                    placeholder="Add a comment..."
                    value={addCommentText}
                    onChange={(e) => setAddCommentText(e.target.value)}
                    ref={textAreaRef}></textarea>
                <div className="flex gap-2">
                    <button
                        className="font-semibold outline-none hover:bg-background-secondary px-3 py-1 rounded-full duration-300"
                        onClick={() => (setGiveReply ? setGiveReply(false) : setAddCommentText(""))}>
                        Cancel
                    </button>
                    <button
                        className={twMerge(
                            "px-3 py-1 rounded-full outline-none bg-primary opacity-75 font-semibold",
                            addCommentText != "" && "opacity-100"
                        )}>
                        Comment
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddComment;