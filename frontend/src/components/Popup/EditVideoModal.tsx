import React, { useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useMedia } from '../../hooks/useMedia';
import { makeApiMediaRequest } from '../../utils/MakeApiRequest';
import { DashboardVideoType } from '../../type/Dashboard.type';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import { ErrorType } from '../../type/Error.type';

interface EditVideoModalProps {
    videoInfo: DashboardVideoType;
    setShowEditVideo: (show: boolean) => void;
}
const EditVideoModal: React.FC<EditVideoModalProps> = ({ videoInfo, setShowEditVideo }) => {
    const { fileInputRef, mediaPreview, setMediaPreview, newMedia, handleMediaChange, discardMediaChange } = useMedia();
    const [videoDescription, setVideoDescription] = React.useState<string>(videoInfo.description);
    const [videoTitle, setVideoTitle] = React.useState<string>(videoInfo.title);
    const videoId = videoInfo._id;

    useEffect(() => {
        setVideoDescription(videoInfo.description);
        setVideoTitle(videoInfo.title);
        setMediaPreview(videoInfo.thumbnail.url);
    }, [videoInfo, setMediaPreview]);

    const updateVideo = () => {
        if (!newMedia && videoTitle.trim() === videoInfo.title &&
            videoDescription.trim() === videoInfo.description) return;

        const data = new FormData();
        if (newMedia) data.append("image", newMedia);
        if (videoTitle !== videoInfo.title)
            data.append("title", videoTitle.trim());
        if (videoDescription !== videoInfo.description)
            data.append("description", videoDescription.trim());

        makeApiMediaRequest({
            method: "patch",
            url: `/api/v1/videos/${videoId}`,
            data
        }).then(() => {
            toast.success("Video uploaded successfully");
            setShowEditVideo(true);
        }).catch((error: ErrorType) => {
            console.error(error.response.data.message);
        })
    }

    return (
        <div className='w-full h-full flex justify-center items-center absolute z-[1] top-0 left-0'>
            < div className='rounded-lg border-[1px] border-primary-border bg-background-secondary p-4 max-w-96 w-fit h-fit overflow-y-auto' >
                <div className='flex gap-2 justify-between items-start'>
                    <div className='text-primary-text'>
                        <h1 className='text-xl font-semibold text-start'>Edit Video</h1>
                        <p className='text-xs text-start text-primary-text2'>Share where you've worked on your profile.</p>
                    </div>
                    <button onClick={() => setShowEditVideo(false)}>
                        <RxCross2 size={24} className='text-primary-text' />
                    </button>
                </div>
                <div className='mt-2 text-primary-text'>
                    <div>
                        <label htmlFor="thumbnail" className='text-sm mb-1'>
                            <p>Thumbnail<sup>*</sup></p>
                            <div className='border-dashed border-2 border-primary-border rounded-lg p-1 cursor-pointer'>
                                <img src={mediaPreview} alt="thumbnail" loading='lazy' className='rounded-lg aspect-video object-cover w-full' />
                            </div>
                        </label>
                        <input type="file" name="thumbnail" id="thumbnail" accept="image/png,image/jpeg" className='hidden'
                            onChange={(e) => handleMediaChange(e, 1)} ref={fileInputRef} />
                    </div>

                    <div className='mt-2 text-sm'>
                        <label htmlFor="title" className='text-sm mb-1'>Title<sup>*</sup></label> <br />
                        <input type="text" name="title" id="title" placeholder='Video Title' value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)}
                            className='bg-transparent border-2 border-primary-border rounded-md w-full px-1.5 py-0.5 outline-none' />
                    </div>
                    <div className='mt-2 text-sm'>
                        <label htmlFor="description" className='text-sm mb-1'>Description<sup>*</sup></label> <br />
                        <textarea name="description" id="description" placeholder='Video Description' value={videoDescription} onChange={(e) => setVideoDescription(e.target.value)}
                            className='bg-transparent border-2 border-primary-border rounded-md w-full overflow-auto px-1.5 py-0.5 resize-none outline-none' rows={6}></textarea>
                    </div>
                </div>

                <div className='flex justify-center gap-4 mt-4 text-sm'>
                    <button className='border-2 border-primary-border rounded-lg bg-transparent text-primary-text px-4 py-2 w-full'
                        onClick={() => { setShowEditVideo(false); discardMediaChange() }}>Cancel</button>
                    <button className={twMerge('text-primary bg-primary-text px-4 py-2 w-full font-semibold rounded-lg',
                        (!newMedia && videoTitle === videoInfo.title && videoDescription === videoInfo.description) && 'opacity-50')}
                        onClick={updateVideo}> Update</button>
                </div>
            </div >
        </div >
    )
}

export default EditVideoModal;