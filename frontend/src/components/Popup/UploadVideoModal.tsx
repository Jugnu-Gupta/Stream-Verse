import React from 'react';
import { RxCross2 } from "react-icons/rx";
import { MdOutlineFileUpload } from "react-icons/md";
import { twMerge } from 'tailwind-merge';
import toast from 'react-hot-toast';

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
        if (e.dataTransfer.files[0].type !== 'video/mp4') {
            console.log('Invalid file type');
        } else {
            if (e.dataTransfer.files[0].size > 15000000) { // filesize > 15MB
                console.log('Video size should not exceed 15 MB');
                toast.error("Video size should not exceed 15 MB");
            } else {
                setSelectedVideo(URL.createObjectURL(e.dataTransfer.files[0]));
            }
        }
    }

    return (
        <div className='w-full -ml-6 h-full flex justify-center items-center absolute z-[1]'>
            <div className='rounded-lg border-[1px] border-primary-border bg-background-secondary p-4 max-w-96 text-wrap w-fit h-fit overflow-y-auto'>
                <div className='flex gap-2 justify-between'>
                    <div className='text-primary-text'>
                        <h1 className='text-xl font-semibold text-start'>Upload Video</h1>
                        <p className='text-xs text-start text-primary-text2'>Share where you've worked on your profile.</p>
                    </div>
                    <button onClick={() => setShowUploadVideo(false)}>
                        <RxCross2 size={24} className='text-primary-text' />
                    </button>
                </div>

                <div className='mt-4 text-primary-text'>
                    <div>
                        <label htmlFor={selectedVideo ? "" : "video"} className='text-sm mb-1'>
                            <div className={twMerge('border-dashed border-2 rounded-lg border-primary-border p-1 aspect-video flex items-center justify-center', !selectedVideo && "cursor-pointer")}>
                                {selectedVideo ? (<video src={selectedVideo} controls className='rounded-lg' />) :
                                    (<div ref={divRef}
                                        onDragOver={(e) => onDragOver(e)}
                                        onDragLeave={() => onDragLeave()}
                                        onDrop={(e) => onDrop(e)}
                                        className='w-full flex flex-col items-center px-2 rounded-lg'>
                                        <MdOutlineFileUpload className='text-5xl p-1 bg-primary-text text-primary rounded-full' />
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
                        <input type="file" name="thumbnail" id="thumbnail" accept="image/png,image/jpeg"
                            // onChange={(e) => validateImageSize(e, 1024 * 1024)}
                            className='text-sm file:bg-primary file:border-primary-border file:outline-none file:border-[2px] file:px-1.5 file:py-1 file:rounded-md file:text-primary-text py-0.5' />
                    </div>

                    <div className='mt-2'>
                        <label htmlFor="title" className='text-sm mb-1'>Title<sup>*</sup></label> <br />
                        <input type="text" name="title" id="title" className='bg-transparent border-2 border-primary-border rounded-md w-full px-1.5 py-0.5 outline-none' />
                    </div>

                    <div className='mt-2'>
                        <label htmlFor="description" className='text-sm mb-1'>Description<sup>*</sup></label> <br />
                        <textarea name="description" id="description" className='bg-transparent border-2 border-primary-border rounded-md w-full overflow-auto px-1.5 py-0.5 resize-none outline-none' rows={6}></textarea>
                    </div>
                </div>

                <div className='flex justify-center gap-4 mt-4'>
                    <button className='border-[1px] border-primary-border bg-transparent text-white px-4 py-2 w-full rounded-lg'
                        onClick={() => setShowUploadVideo(false)}>Cancel</button>
                    <button className='text-primary bg-primary-text px-4 py-2 w-full font-semibold rounded-lg'
                        onClick={() => setShowUploadVideo(false)}> Update</button>
                </div>
            </div>
        </div >
    )
}

export default UploadVideoModal;