import React, { Dispatch, SetStateAction } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import makeApiRequest from '../../utils/MakeApiRequest';
import toast from 'react-hot-toast';

interface DeleteVideoModalProps {
    Name: string;
    Url: string;
    setShowDeleteModal: Dispatch<SetStateAction<boolean>> | ((show: boolean) => void);
}

const DeleteVideoModal: React.FC<DeleteVideoModalProps> = ({ Name, Url, setShowDeleteModal }) => {
    const heading = `Delete ${Name}`;
    const description = `Are you sure you want to delete this ${Name}? Once its deleted, you will not be able to recover it.`;

    const handleDelete = () => {
        makeApiRequest({
            method: "delete",
            url: Url,
        }).then((response: any) => { // eslint-disable-line
            console.log("channelsResponse playlists:", response.data);
            toast.success(`${Name} deleted successfully`);
            setShowDeleteModal(true);
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }
    return (
        // <div className='w-full h-full flex justify-center items-center bg-black bg-opacity-20 absolute z-[1]'>
        // <div className='w-full h-full flex justify-center items-center absolute z-[20] left-0 top-0'>
        <div className='w-full h-full flex justify-center items-center fixed z-[20] top-0 left-0' >
            <div className='rounded-lg border-2 border-primary-border bg-background-secondary p-4 w-96 text-wrap h-fit'>
                <div className='flex gap-2 justify-between items-start'>
                    <div className='bg-red-200 rounded-full h-7 aspect-square flex items-center justify-center'>
                        <RiDeleteBin6Line size={18} className='text-red-500' />
                    </div>
                    <div className='text-primary-text text-start'>
                        <h1 className='text-xl font-semibold'>{heading}</h1>
                        <p className='text-xs w-fit text-primary-text2'>{description}</p>
                    </div>
                    <button onClick={() => setShowDeleteModal(false)}>
                        <RxCross2 size={24} className='text-primary-text' />
                    </button>
                </div>
                <div className='flex justify-center gap-4 mt-4'>
                    <button className='border-2 border-primary-border bg-transparent text-primary-text px-4 py-2 w-full rounded-lg'
                        onClick={() => setShowDeleteModal(false)}>Cancel</button>
                    <button className='bg-red-500 text-primary-text font-semibold px-4 py-2 w-full rounded-lg'
                        onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div >
    )
}

export default DeleteVideoModal;