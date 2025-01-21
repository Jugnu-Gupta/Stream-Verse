import React, { Dispatch, SetStateAction } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import makeApiRequest from '../../utils/MakeApiRequest';
import toast from 'react-hot-toast';
import { ErrorType } from '../../type/Error.type';
import { AppDispatch, RootState } from '../../context/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCounter } from '../../context/slices/Counter.slice';
import { ResponseType } from '../../type/Response.type';

interface DeleteModalProps {
    Name: string;
    Url: string;
    currPath: string[];
    setShowDeleteModal: Dispatch<SetStateAction<boolean>> | ((show: boolean, currPath: string[]) => void);
}

const DeleteModal: React.FC<DeleteModalProps> = ({ Name, Url, currPath, setShowDeleteModal }) => {
    const dispatch = useDispatch<AppDispatch>();
    const heading = `Delete ${Name}`;
    const description = `Are you sure you want to delete this ${Name.toLowerCase()}? Once its deleted, you will not be able to recover it.`;
    const counter = useSelector((state: RootState) => state.counter.value);

    const handleDelete = () => {
        makeApiRequest({
            method: "delete",
            url: Url,
        }).then((response) => {
            const data = (response as ResponseType).data;
            toast.success(`${Name} deleted successfully`);
            dispatch(setCounter({ value: counter - data.deletedCount }));
            setShowDeleteModal(true, currPath);
        }).catch((error: ErrorType) => {
            console.error(error.response.data.message);
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
                    <button onClick={() => setShowDeleteModal(false, currPath)}>
                        <RxCross2 size={24} className='text-primary-text' />
                    </button>
                </div>
                <div className='flex justify-center gap-4 mt-4'>
                    <button className='border-2 border-primary-border bg-transparent text-primary-text px-4 py-2 w-full rounded-lg'
                        onClick={() => setShowDeleteModal(false, currPath)}>Cancel</button>
                    <button className='bg-red-500 text-primary-text font-semibold px-4 py-2 w-full rounded-lg'
                        onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div >
    )
}

export default DeleteModal;