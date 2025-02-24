import React, { useEffect, Dispatch, SetStateAction } from 'react';
import makeApiRequest from '../../utils/MakeApiRequest';
import { twMerge } from 'tailwind-merge';
import { addComments } from '../../context/slices/Comment.slice';
import { useDispatch } from 'react-redux';
import { increaseCount } from '../../context/slices/Counter.slice';
import { AppDispatch } from '../../context/store';
import { CommentType } from '../../type/Comment.type';
import { ErrorType } from '../../type/Error.type';
import { ResponseType } from '../../type/Response.type';
import { generateAvatar } from '../../utils/GenerateAvatar';
import toast from 'react-hot-toast';

interface AddCommentProps {
    setGiveReply?: Dispatch<SetStateAction<boolean>>;
    avatarStyle: string;
    entityType: string;
    entityId: string;
    parentId?: string;
    currPath: string[];
}
const AddComment: React.FC<AddCommentProps> = ({ setGiveReply, avatarStyle, entityType, entityId, parentId, currPath }) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
    const [addCommentText, setAddCommentText] = React.useState<string>("");
    const userId = localStorage.getItem("userId") || "userId";
    const userName = localStorage.getItem("userName") || "UserName";
    const fullName = localStorage.getItem("fullName") || "fullName";
    const avatarInfo = localStorage.getItem("avatar");
    const avatar = avatarInfo ? JSON.parse(avatarInfo) : null;
    const avatarUrl = avatar?.url || generateAvatar(fullName, "0078e1", "ffffffcc", 50);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current!.style.height = "32px";
            const scrollHeight = textAreaRef.current!.scrollHeight;
            textAreaRef.current!.style.height = `${scrollHeight}px`;
        }
    }, [addCommentText]);

    const handleCreateComment = () => {
        if (addCommentText.trim() === "") return;

        makeApiRequest({
            method: "post",
            url: `/api/v1/comments/${entityType}/${entityId}${parentId ? `/${parentId}` : ""}`,
            data: {
                content: addCommentText.trim(),
            },
        }).then((response) => {
            const data = (response as ResponseType).data;
            const child: CommentType = {
                owner: {
                    _id: userId,
                    avatar: avatar,
                    userName,
                    fullName,
                },
                content: data.content,
                _id: data._id,
                replies: 0,
                likeStatus: 0,
                likes: 0,
                dislikes: 0,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            }
            dispatch(addComments({ childPathIds: currPath, childs: [child] }));
            dispatch(increaseCount());
            setAddCommentText("");
            if (setGiveReply) setGiveReply(false);
        }).catch((error: ErrorType) => {
            if (error.response.data.statusCode === 401) {
                toast.error("Please login to comment");
            }
            console.error(error.response.data.message);
        });
    }

    return (
        <div className="flex items-start w-full gap-2">
            <div className={twMerge("overflow-hidden rounded-full min-w-7", avatarStyle)}>
                <img src={avatarUrl} alt="avatar" loading='lazy'
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
                    <button onClick={handleCreateComment}
                        className={twMerge(
                            "px-3 py-1 rounded-full outline-none bg-primary font-semibold",
                            addCommentText.trim() !== "" ? "opacity-100" : "opacity-50"
                        )}>
                        Comment
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddComment;