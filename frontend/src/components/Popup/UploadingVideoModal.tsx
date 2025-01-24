import React, { Dispatch, SetStateAction } from 'react';
import { RxCross2 } from "react-icons/rx";
import { FaVideo } from "react-icons/fa6";
import { twMerge } from 'tailwind-merge';
import toast from 'react-hot-toast';
import { formatFileSize } from '../../utils/FormatFileSize';

interface UploadingVideoModalProps {
    videoName: string;
    videoSize: number;
    uploadProgress: number;
    setShowUploadingVideo: Dispatch<SetStateAction<boolean>>;
}

const UploadingVideoModal: React.FC<UploadingVideoModalProps> = ({ uploadProgress, videoName, videoSize, setShowUploadingVideo }) => {
    const fileSize = formatFileSize(videoSize);
    const handleFinishUpload = () => {
        if (uploadProgress < 100) {
            toast.error('Please wait for the video to finish uploading.');
            return;
        } else {
            setShowUploadingVideo(false);
        }
    }
    return (
        // <div className='w-full h-full flex justify-center items-center bg-black bg-opacity-20 absolute z-[1]'>
        <div className='w-full h-full flex justify-center items-center absolute z-[1] left-0 top-0'>
            <div className='rounded-lg border-2 border-primary-border bg-background-secondary p-3 pt-2 w-96 h-fit'>
                <div className='flex gap-2 justify-between items-start'>
                    <div className='text-primary-text text-start'>
                        <h1 className='text-xl font-semibold'>Uploading Video...</h1>
                        <p className='text-xs text-primary-text2'>Track your video uploading process.</p>
                    </div>
                    <button onClick={() => setShowUploadingVideo(false)}>
                        <RxCross2 size={24} className='text-primary-text' />
                    </button>
                </div>
                <div className='flex gap-2 my-4 border-2 border-primary-border p-2 items-start'>
                    <div className='bg-primary rounded-full h-6 w-6 flex items-center justify-center pl-0.5 pt-0.5'>
                        <FaVideo size={16} className='text-primary-text' />
                    </div>

                    <div className='w-full'>
                        <div className='text-primary-text2 text-xs'>
                            <p>{videoName}</p>
                            <p>{fileSize}</p>
                            <p>{uploadProgress}%</p>
                        </div>
                        <div className='bg-primary h-[5px] w-full rounded-full mt-2'>
                            <div className="bg-primary-text2 h-full rounded-full" style={{ width: `${uploadProgress}%` }} >
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center gap-4 mt-4'>
                    <button className='border-2 border-primary-border bg-transparent text-primary-text rounded-lg px-4 py-2 w-full'
                        onClick={() => setShowUploadingVideo(false)}>Hide</button>
                    <button className={twMerge('bg-red-500 text-primary-text font-semibold rounded-lg px-4 py-2 w-full', uploadProgress < 100 && 'opacity-50')}
                        onClick={handleFinishUpload}>Finish</button>
                </div>
            </div>
        </div>
    )
}


export default UploadingVideoModal;