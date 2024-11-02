import React from 'react'
import { RxCross2 } from "react-icons/rx";
import thumbnail from '../../assets/thumbnail.png';

const EditVideo: React.FC = () => {
    return (
        <div className='w-full h-full flex justify-center items-center bg-black bg-opacity-20 absolute'>
            <div className='rounded-lg border-[1px] border-white bg-background-light p-4 max-w-96 w-fit h-fit overflow-y-auto'>
                <div className='flex gap-2 justify-between'>
                    <div className='text-white'>
                        <h1 className='text-xl font-semibold text-start'>Edit Video</h1>
                        <p className='text-xs text-start'>Share where you've worked on your profile.</p>
                    </div>
                    <button>
                        <RxCross2 size={24} className='text-white' />
                    </button>
                </div>
                <div className='mt-2 text-white'>
                    <div>
                        <label htmlFor="thumbnail" className='text-sm mb-1'>
                            <p>Thumbnail<sup>*</sup></p>
                            <div className='border-dashed border-[1px] border-white p-1 cursor-pointer'>
                                <img src={thumbnail} alt="thumbnail" />
                            </div>
                        </label>
                        <input type="file" name="thumbnail" id="thumbnail" accept="image/png" className='hidden' />
                    </div>

                    <div className='mt-2'>
                        <label htmlFor="title" className='text-sm mb-1'>Title<sup>*</sup></label> <br />
                        <input type="text" name="title" id="title" className='bg-transparent border-[1px] w-full' />
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="description" className='text-sm mb-1'>Description<sup>*</sup></label> <br />
                        <textarea name="description" id="description" className='bg-transparent border-[1px] w-full overflow-auto resize-none' rows={6}></textarea>
                    </div>

                </div>
                <div className='flex justify-center gap-4 mt-4'>
                    <button className='border-[1px] bg-transparent text-white px-4 py-2 w-full'>Cancel</button>
                    <button className='bg-primary text-white px-4 py-2 w-full'>Update</button>
                </div>
            </div>
        </div>
    )
}

export default EditVideo;