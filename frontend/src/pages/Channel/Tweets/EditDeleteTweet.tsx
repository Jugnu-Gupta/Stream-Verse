import React, { Dispatch, SetStateAction } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { EditDeleteWrapper } from '../../../type/EditDelete.type';

interface EditDeleteCommentProps extends EditDeleteWrapper {
    tweetId: string;
    tweetText: string;
    discardImageChange?: () => void;
    setTweetText: Dispatch<SetStateAction<string>>;
}
const EditDeleteTweet: React.FC<EditDeleteCommentProps> =
    ({ tweetId, tweetText, setTweetText, discardImageChange, editDeleteOption, setEditDeleteOption }) => {
        const handleOptions = (tweetId: string) => {
            if (editDeleteOption.currentId === tweetId) {
                setEditDeleteOption({
                    currentId: "",
                    showEditModal: false,
                    showDeleteModal: false,
                    showEditDeletePopup: false
                });
                setTweetText(tweetText);
                if (discardImageChange) discardImageChange();
            } else {
                setEditDeleteOption({
                    currentId: tweetId,
                    showEditModal: false,
                    showDeleteModal: false,
                    showEditDeletePopup: true
                });
            }
        }

        return (<div className="relative right-0 top-0 cursor-pointer text-primary-text">
            <BsThreeDotsVertical onClick={() => handleOptions(tweetId)} className='text-3xl hover:bg-primary rounded-full p-1.5' />

            {(editDeleteOption.currentId === tweetId && editDeleteOption.showEditDeletePopup) &&
                (<div className="absolute z-10 rounded-lg bg-background-primary text-primary-text cursor-auto top-0 right-8 border-primary-border border-2">
                    <button className="text-sm font-semibold flex items-center gap-2 hover:bg-primary px-3 py-1 w-full"
                        onClick={() => setEditDeleteOption({ ...editDeleteOption, showEditModal: true, showEditDeletePopup: false })}>
                        <MdDriveFileRenameOutline /> <span>Edit</span>
                    </button>
                    <button className="text-sm font-semibold flex items-center gap-2 mt-2 hover:bg-primary px-3 py-1 w-full"
                        onClick={() => setEditDeleteOption({ ...editDeleteOption, showDeleteModal: true, showEditDeletePopup: false })}>
                        <RiDeleteBinLine /> <span>Delete</span>
                    </button>
                </div>)
            }
        </div>)
    }

export default EditDeleteTweet;