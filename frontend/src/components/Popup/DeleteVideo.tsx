import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const DeleteVideo: React.FC = () => {
    return (
        <div className='w-full h-full flex justify-center items-center bg-black bg-opacity-20 absolute'>
            <div className='rounded-lg border-[1px] border-white bg-background-light p-4 w-96 h-fit'>
                <div className='flex gap-2 justify-between items-start'>
                    <div className='bg-red-200 rounded-full h-7 aspect-square flex items-center justify-center'>
                        <RiDeleteBin6Line size={18} className='text-red-500' />
                    </div>
                    <div className='text-white text-start'>
                        <h1 className='text-xl font-semibold'>Delete Video</h1>
                        <p className='text-xs'>Are you sure you want to delete this video? Once its deleted, you will not be able to recover it.</p>
                    </div>
                    <button>
                        <RxCross2 size={24} className='text-white' />
                    </button>
                </div>
                <div className='flex justify-center gap-4 mt-4'>
                    <button className='border-[1px] bg-transparent text-white px-4 py-2 w-full'>Cancel</button>
                    <button className='bg-red-500 text-white px-4 py-2 w-full'>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteVideo;