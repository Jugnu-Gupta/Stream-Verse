import React from 'react';
import { RxCross2 } from "react-icons/rx";
import { FaVideo } from "react-icons/fa6";

interface UploadingVideoModalProps {
    setShowUploadingVideo: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadingVideoModal: React.FC<UploadingVideoModalProps> = ({ setShowUploadingVideo }) => {
    const fileSize = "100MB";

    return (
        // <div className='w-full h-full flex justify-center items-center bg-black bg-opacity-20 absolute z-[1]'>
        <div className='w-full h-full flex justify-center items-center absolute z-[1] left-0 top-0'>
            <div className='rounded-lg border-[1px] border-white bg-background-secondary p-3 pt-2 w-96 h-fit'>
                <div className='flex gap-2 justify-between items-start'>
                    <div className='text-white text-start'>
                        <h1 className='text-xl font-semibold'>Uploading Video...</h1>
                        <p className='text-xs'>Teack your video uploading process.</p>
                    </div>
                    <button onClick={() => setShowUploadingVideo(false)}>
                        <RxCross2 size={24} className='text-white' />
                    </button>
                </div>
                <div className='flex gap-2 my-4 border-[1px] p-2 items-start'>
                    <div className='bg-primary rounded-full h-6 w-6 flex items-center justify-center pl-0.5 pt-0.5'>
                        <FaVideo size={12} className='text-white' />
                    </div>

                    <div className='w-full'>
                        <div className='text-white text-xs'>
                            <p>Video Name</p>
                            <p>{fileSize}</p>
                        </div>
                        <div className='bg-primary h-[5px] w-full rounded-full mt-2'>
                            <div className='bg-white h-full rounded-full'></div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center gap-4 mt-4'>
                    <button className='border-[1px] bg-transparent text-white px-4 py-2 w-full'
                        onClick={() => setShowUploadingVideo(false)}>Cancel</button>
                    <button className='bg-red-500 text-white px-4 py-2 w-full'
                        onClick={() => setShowUploadingVideo(false)}>Delete</button>
                </div>
            </div>
        </div>
    )
}


export default UploadingVideoModal;