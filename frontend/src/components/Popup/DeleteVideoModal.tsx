import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

interface DeleteVideoModalProps {
    setShowDeleteVideo: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteVideoModal: React.FC<DeleteVideoModalProps> = ({ setShowDeleteVideo }) => {
    return (
        // <div className='w-full h-full flex justify-center items-center bg-black bg-opacity-20 absolute z-[1]'>
        <div className='w-full h-full flex justify-center items-center absolute z-[1] left-0 top-0'>
            <div className='rounded-lg border-[1px] border-white bg-background-secondary p-4 w-96 text-wrap h-fit'>
                <div className='flex gap-2 justify-between items-start'>
                    <div className='bg-red-200 rounded-full h-7 aspect-square flex items-center justify-center'>
                        <RiDeleteBin6Line size={18} className='text-red-500' />
                    </div>
                    <div className='text-white text-start'>
                        <h1 className='text-xl font-semibold'>Delete Video</h1>
                        <p className='text-xs w-fit'>Are you sure you want to delete this video? Once its deleted, you will not be able to recover it.</p>
                    </div>
                    <button onClick={() => setShowDeleteVideo(false)}>
                        <RxCross2 size={24} className='text-white' />
                    </button>
                </div>
                <div className='flex justify-center gap-4 mt-4'>
                    <button className='border-[1px] bg-transparent text-white px-4 py-2 w-full'
                        onClick={() => setShowDeleteVideo(false)}>Cancel</button>
                    <button className='bg-red-500 text-white px-4 py-2 w-full'
                        onClick={() => setShowDeleteVideo(false)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteVideoModal;