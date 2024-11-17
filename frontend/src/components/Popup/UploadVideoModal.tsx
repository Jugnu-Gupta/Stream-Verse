import React from 'react';
import { RxCross2 } from "react-icons/rx";
// import thumbnail from '../../assets/thumbnail.png';
import { MdOutlineFileUpload } from "react-icons/md";
import { twMerge } from 'tailwind-merge';

interface UploadVideoModalProps {
    setShowUploadVideo: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadVideoModal: React.FC<UploadVideoModalProps> = ({ setShowUploadVideo }) => {
    const [selectedVideo, setSelectedVideo] = React.useState<string>("");
    const divRef = React.useRef<HTMLDivElement>(null);

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        divRef.current!.classList.add('opacity-50');
    }
    const onDragLeave = () => divRef.current!.classList.remove('opacity-50');
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        divRef.current!.classList.remove('opacity-50');
        setSelectedVideo(URL.createObjectURL(e.dataTransfer.files[0]));
    }

    return (
        <div className='w-full -ml-6 h-full flex justify-center items-center absolute z-[1]'>
            <div className='rounded-lg border-[1px] border-white bg-background-secondary p-4 max-w-96 text-wrap w-fit h-fit overflow-y-auto'>
                <div className='flex gap-2 justify-between'>
                    <div className='text-white'>
                        <h1 className='text-xl font-semibold text-start'>Upload Video</h1>
                        <p className='text-xs text-start'>Share where you've worked on your profile.</p>
                    </div>
                    <button onClick={() => setShowUploadVideo(false)}>
                        <RxCross2 size={24} className='text-white' />
                    </button>
                </div>

                <div className='mt-4 text-white'>
                    <div>
                        <label htmlFor={selectedVideo ? "" : "video"} className='text-sm mb-1'>
                            <div className={twMerge('border-dashed border-[1px] border-white p-1', !selectedVideo && "cursor-pointer")}>
                                {
                                    selectedVideo ? (<video src={selectedVideo} controls></video>) :
                                        (<div ref={divRef}
                                            onDragOver={(e) => onDragOver(e)}
                                            onDragLeave={() => onDragLeave()}
                                            onDrop={(e) => onDrop(e)}
                                            className='w-full flex flex-col items-center my-4 px-2'>
                                            <MdOutlineFileUpload className='text-6xl p-1 bg-white text-primary rounded-full' />
                                            <h2 className='text-xs font-semibold mt-2 mb-1'>Drag and drop video files to upload</h2>
                                            <p className='text-xs'>Your videos will be private untill you publish them</p>
                                        </div >)
                                }
                            </div>
                        </label>
                        <input type="file" name="video" id="video" accept="video/mp4" className='hidden'
                            onChange={(e) => setSelectedVideo(URL.createObjectURL(e.target.files![0]))}
                        />
                    </div>

                    <div className='mt-2'>
                        <label htmlFor="thumbnail" className='text-sm mb-1'>
                            <p>Thumbnail<sup>*</sup></p>
                        </label>
                        <input type="file" name="thumbnail" id="thumbnail" accept="image/png" className='text-sm border-[1px] border-white file:bg-primary file:border-none file:text-white w-full p-1' />
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
                        onClick={() => setShowUploadVideo(false)}>Cancel</button>
                    <button className='bg-primary text-white px-4 py-2 w-full'
                        onClick={() => setShowUploadVideo(false)}> Update</button>
                </div>
            </div>
        </div >
    )
}

export default UploadVideoModal;