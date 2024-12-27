import React from 'react';
import { RxCross2 } from "react-icons/rx";
import thumbnail from '../../assets/thumbnail.png';
import { useImage } from '../../hooks/useImage';

interface EditVideoModalProps {
    setShowEditVideo: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditVideoModal: React.FC<EditVideoModalProps> = ({ setShowEditVideo }) => {
    const { fileInputRef, imagePreview, handleImageChange, discardImageChange } = useImage();

    return (
        // <div className='w-full h-full flex justify-center items-center bg-black bg-opacity-20 absolute z-[1]'>
        <div className='w-full h-full flex justify-center items-center absolute z-[1] top-0 left-0'>
            < div className='rounded-lg border-[1px] border-primary-border bg-background-secondary p-4 max-w-96 w-fit h-fit overflow-y-auto' >
                <div className='flex gap-2 justify-between'>
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
                                <img src={imagePreview ? imagePreview : thumbnail} alt="thumbnail" className='rounded-lg aspect-video object-cover' />
                            </div>
                        </label>
                        <input type="file" name="thumbnail" id="thumbnail" accept="image/png,image/jpeg" className='hidden'
                            onChange={(e) => handleImageChange(e, 1024 * 1024)} ref={fileInputRef} />
                    </div>

                    <div className='mt-2 text-sm'>
                        <label htmlFor="title" className='text-sm mb-1'>Title<sup>*</sup></label> <br />
                        <input type="text" name="title" id="title" placeholder='Video Title'
                            className='bg-transparent border-2 border-primary-border rounded-md w-full px-1.5 py-0.5 outline-none' />
                    </div>
                    <div className='mt-2 text-sm'>
                        <label htmlFor="description" className='text-sm mb-1'>Description<sup>*</sup></label> <br />
                        <textarea name="description" id="description" placeholder='Video Description'
                            className='bg-transparent border-2 border-primary-border rounded-md w-full overflow-auto px-1.5 py-0.5 resize-none outline-none' rows={6}></textarea>
                    </div>

                </div>
                <div className='flex justify-center gap-4 mt-4 text-sm'>
                    <button className='border-2 border-primary-border rounded-lg bg-transparent text-primary-text px-4 py-2 w-full'
                        onClick={() => { setShowEditVideo(false); discardImageChange() }}>Cancel</button>
                    <button className='text-primary bg-primary-text px-4 py-2 w-full font-semibold rounded-lg'
                        onClick={() => setShowEditVideo(false)}> Update</button>
                </div>
            </div >
        </div >
    )
}

export default EditVideoModal;