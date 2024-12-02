import React from 'react';
import { RxCross2 } from "react-icons/rx";
import _thumbnail from '../../assets/thumbnail.png';
import { updateImage } from '../../utils/UpdateImage';

interface EditVideoModalProps {
    setShowEditVideo: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditVideoModal: React.FC<EditVideoModalProps> = ({ setShowEditVideo }) => {
    const [thumbnail, setThumbnail] = React.useState<string>("");

    return (
        // <div className='w-full h-full flex justify-center items-center bg-black bg-opacity-20 absolute z-[1]'>
        <div className='w-full h-full flex justify-center items-center absolute z-[1] top-0 left-0'>
            < div className='rounded-lg border-[1px] border-white bg-background-secondary p-4 max-w-96 w-fit h-fit overflow-y-auto' >
                <div className='flex gap-2 justify-between'>
                    <div className='text-white'>
                        <h1 className='text-xl font-semibold text-start'>Edit Video</h1>
                        <p className='text-xs text-start'>Share where you've worked on your profile.</p>
                    </div>
                    <button onClick={() => setShowEditVideo(false)}>
                        <RxCross2 size={24} className='text-white' />
                    </button>
                </div>
                <div className='mt-2 text-white'>
                    <div>
                        <label htmlFor="thumbnail" className='text-sm mb-1'>
                            <p>Thumbnail<sup>*</sup></p>
                            <div className='border-dashed border-[1px] border-white p-1 cursor-pointer'>
                                <img src={thumbnail ? thumbnail : _thumbnail} alt="thumbnail" />
                            </div>
                        </label>
                        <input type="file" name="thumbnail" id="thumbnail" accept="image/png,image/jpeg" className='hidden'
                            onChange={(e) => updateImage(e, setThumbnail, 1024 * 1024)}
                        />
                    </div>

                    <div className='mt-2'>
                        <label htmlFor="title" className='text-sm mb-1'>Title<sup>*</sup></label> <br />
                        <input type="text" name="title" id="title" className='bg-transparent border-[1px] w-full px-1 outline-none' />
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="description" className='text-sm mb-1'>Description<sup>*</sup></label> <br />
                        <textarea name="description" id="description" className='bg-transparent border-[1px] w-full overflow-auto px-1 resize-none outline-none' rows={6}></textarea>
                    </div>

                </div>
                <div className='flex justify-center gap-4 mt-4'>
                    <button className='border-[1px] bg-transparent text-white px-4 py-2 w-full'
                        onClick={() => setShowEditVideo(false)}>Cancel</button>
                    <button className='bg-primary text-white px-4 py-2 w-full'
                        onClick={() => setShowEditVideo(false)}> Update</button>
                </div>
            </div >
        </div >
    )
}

export default EditVideoModal;